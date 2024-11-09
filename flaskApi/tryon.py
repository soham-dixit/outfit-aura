import pandas as pd
import requests
import asyncio
import aiohttp
import base64
import os
import firebase_admin
from firebase_admin import credentials, storage
from dotenv import load_dotenv

FITTED_IMAGES_FOLDER = "./fitted_images/"
load_dotenv()

# Initialize Firebase Admin SDK with credentials JSON
cred = credentials.Certificate('D:\\Projects\\Flipkart GRiD 5.0\\new\\fashionkart\\website\\server\\firebase-admin-sdk.json')  # Replace with the path to your service account JSON
firebase_admin.initialize_app(cred, {
    'storageBucket': 'fashionkart-26db7.appspot.com'  # Replace with your Firebase Storage bucket name
})

def local_image_to_base64(image_path: str) -> str:
    print("local_image_to_base64 called")
    with open(image_path, "rb") as image_file:
        base64_encoded = base64.b64encode(image_file.read()).decode('utf-8')
    return base64_encoded

async def to_b64(img_url: str) -> str:
    print("to_b64 called")
    async with aiohttp.ClientSession() as session:
        async with session.get(img_url) as response:
            data = await response.read()
            return base64.b64encode(data).decode('utf-8')

async def segmind_diffusion(cloth_image_path: str = None, model_image_path: str = None, cloth_image_url: str = None, model_image_url: str = None, clothing_category: str = None):
    print("Segmind diffusion called")
    api_key = os.getenv("SEGMIND_API_KEY")
    url = "https://api.segmind.com/v1/try-on-diffusion"

    if model_image_path:
        model_image_b64 = local_image_to_base64(model_image_path)
    else:
        model_image_b64 = await to_b64(model_image_url)

    cloth_image_b64 = local_image_to_base64(cloth_image_path) if cloth_image_path else await to_b64(cloth_image_url)

    data = {
        "model_image": model_image_b64,
        "cloth_image": cloth_image_b64,
        "category": clothing_category,
        "num_inference_steps": 35,
        "guidance_scale": 2,
        "seed": 12467,
        "base64": False
    }

    headers = {
        'x-api-key': api_key,
        'Content-Type': 'application/json'
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=data, headers=headers) as response:
            print("test")
            if response.status == 200:
                image_data = await response.read()
                if cloth_image_url:
                    img_path = os.path.join(FITTED_IMAGES_FOLDER, f"{cloth_image_url.split('/')[-1]}.png")
                elif cloth_image_path:
                    cloth_image_path = cloth_image_path.split("\\")[-1]
                    img_path = os.path.join(FITTED_IMAGES_FOLDER, cloth_image_path.split('/')[-1])  
                
                with open(img_path, "wb") as image_file:
                    image_file.write(image_data)
                return img_path
            else:
                error_message = await response.text()
                return {"error": response.status, "message": error_message}

def upload_to_firebase(img_path: str, storage_path: str):
    print(f"Uploading {img_path} to Firebase under {storage_path}")
    
    # Get the storage bucket
    bucket = storage.bucket()
    
    # Create a blob (file object) in the Firebase Storage
    blob = bucket.blob(storage_path)
    
    # Upload the image to Firebase Storage
    blob.upload_from_filename(img_path)
    
    # Optionally, make the file public
    blob.make_public()
    
    print(f"File uploaded to Firebase. Public URL: {blob.public_url}")
    return blob.public_url

async def try_on(cloth_image_path: str = None, person_image_path: str = None, cloth_image_url: str = None, person_image_url: str = None, clothing_category: str = None):                
    print("Try on API Called")
    print(cloth_image_path)
    print(person_image_path)
    print(cloth_image_url)
    print(person_image_url)
    print(clothing_category)
    result = await segmind_diffusion(cloth_image_path=cloth_image_path, model_image_path=person_image_path, cloth_image_url=cloth_image_url, model_image_url=person_image_url, clothing_category=clothing_category)
    if isinstance(result, str) and os.path.exists(result):
        # Define where you want to store the image in Firebase (folder structure)
        storage_path = f"fitted_images/{os.path.basename(result)}"
        
        # Upload to Firebase
        public_url = upload_to_firebase(result, storage_path)
        # print(public_url)
    print("Try on API Completed")
    return public_url