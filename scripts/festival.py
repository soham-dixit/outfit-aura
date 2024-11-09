from datetime import datetime, timedelta
from PIL import Image, UnidentifiedImageError
import io
import requests
import uuid
import firebase_admin
from firebase_admin import credentials, storage
from pymongo import MongoClient
import random
import time

cred = credentials.Certificate("/home/abhinav/Desktop/Fashionkart/FashionKart/website/server/firebase-admin-sdk.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'gs://fashionkart-26db7.appspot.com/'
})

mongo_client = MongoClient('mongodb+srv://StealthMode:ehfjZVeARoqO3Elb@stealthmode.mggqpgd.mongodb.net/?retryWrites=true&w=majority&appName=StealthMode') 
db = mongo_client['test']

festivals = db['festivals']

festive_json = {
    "New Year's Day": "01/1",
    "Lohri": "13/1",
    "Makar Sankranti": "14/1",
    "Pongal": "15/01",
    "Guru Gobind Singh Jayanti": "17/1",
    "Republic Day": "26/1",
    "Losar": "10/2",
    "Basant Panchmi": "14/2",
    "Guru Ravidas Jayanti": "24/2",
    "Maharshi Dayanand Saraswati Jayanti": "06/3",
    "Mahashivratri": "08/3",
    "Holi": "25/3",
    "Good Friday": "29/3",
    "Easter Day": "31/3",
    "Gudi Padwa": "09/4",
    "Eid-ul-Fitr": "10/4",
    "Vaisakhi (Vishu)": "13/4",
    "Rama Navami": "17/4",
    "Mahavir Jayanti": "21/4",
    "Rabindra Jayanti": "08/5",
    "Buddha Purnima (Vesak)": "23/5",
    "Id-ul-Zuha (Bakrid)": "17/6",
    "Rath Yatra": "07/7",
    "Muharram (Ashura)": "17/7",
    "Independence Day": "15/8",
    "Parsi New Year": "15/8",
    "Raksha Bandhan (Rakhi)": "19/8",
    "Janmashtami": "26/8",
    "Ganesh Chaturthi": "07/9",
    "Onam": "15/9",
    "Milad-un-Nabi or Id-e- Milad": "16/9",
    "Gandhi Jayanti": "02/10",
    "Dussehra": "12/10",
    "Valmiki Jayanti": "17/10",
    "Karva Chauth": "20/10",
    "Dhanteras": "29/10",
    "Diwali": "31/10",
    "Kali Puja": "31/10",
    "Lakshmi Puja": "31/10",
    "Halloween Day": "31/10",
    "Karnataka Rajyotsava": "01/11",
    "Kerala Piravi": "01/11",
    "Govardhan Puja": "02/11",
    "Bhai Dooj": "03/11",
    "Chhath Puja": "07/11",
    "Guru Nanak Jayanti": "15/11",
    "Christmas": "25/12"
}

def get_next_festival(festive_data):
    today = datetime.now()
    current_year = today.year
    festivals = []

    for festival, date_str in festive_data.items():
        day, month = map(int, date_str.split('/'))
        festival_date = datetime(current_year, month, day)

        if festival_date >= today:
            festivals.append((festival, festival_date))
        else:
            next_year_festival_date = datetime(current_year + 1, month, day)
            festivals.append((festival, next_year_festival_date))

    festivals.sort(key=lambda x: x[1])
    next_festival, festival_date = festivals[0]
    return next_festival, festival_date

def generate_gendered_fashion_prompts(festival_name, gender, count=5):
    style_variations = [
        "vibrant and festive colors, featuring traditional elements like embroidery or embellishments, without including any people",
        "a minimalist and elegant design that focuses on flowing silhouettes and soft fabrics, showcasing clothing only",
        "intricate traditional patterns with rich textures and cultural motifs, emphasizing the beauty of the fabric",
        "a modern take on festive attire that blends contemporary styles with classic influences, shown without any people",
        "rich cultural elements highlighting unique garment styles, such as sarees or kurtas, focusing solely on the clothing"
    ]
    
    garment_types = {
        "male": ["kurta", "sherwani", "dhoti", "churidaar", "bandhgala"],
        "female": ["saree", "lehenga", "salwar kameez", "anarkali", "ethnic dress"]
    }
    
    # Ensure the count does not exceed the number of available combinations
    max_combinations = 5
    
    prompts = []
    for i in range(max_combinations):
        prompt = (
            f"Create a high-quality image of a {garment_types[gender][i]} for {festival_name}, "
            f"showcasing {style_variations[i]}."
        )
        prompts.append(prompt)
    
    return prompts



next_festival, date = get_next_festival(festive_json)
print(f"Next festival: {next_festival} on {date.strftime('%d/%m/%Y')}")

male_prompts = generate_gendered_fashion_prompts(next_festival, "male")
female_prompts = generate_gendered_fashion_prompts(next_festival, "female")

API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large"
headers = {"Authorization": "Bearer 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"}

def query(payload):
        try:
            response = requests.post(API_URL, headers=headers, json=payload)
            response.raise_for_status()  # Raise an exception for HTTP error statuses
            return response.content
        except requests.exceptions.RequestException as e:
            print("Error making API request:", e)
            return None
    
def upload_to_firebase(image_stream, folder_name):
    bucket_name = 'fashionkart-26db7.appspot.com'  # Remove 'gs://'
    bucket = storage.bucket(bucket_name)
    
    blob = bucket.blob(f"{folder_name}/{uuid.uuid4()}.jpg")
    blob.upload_from_file(image_stream, content_type="image/jpeg")
    
    return blob.public_url

def generate_image(prompt):
    image_bytes = query({
        "inputs": f"{prompt}",
    })
    
    if image_bytes is None:
        return None

    try:
        image = Image.open(io.BytesIO(image_bytes))

        image_stream = io.BytesIO()
        image.save(image_stream, format="JPEG")
        image_stream.seek(0)
        
        image.show()

        image_url = upload_to_firebase(image_stream, 'festivalImages')
        return image_url
    except UnidentifiedImageError as e:
        print("Error:", e)
        return None

print("Male Prompts:")
for prompt in male_prompts:
    # generate image
    print(prompt)
    image_url = generate_image(prompt)
    print("Image URL:", image_url)
    # save it in mongodb with image_url, festival and gender
    festivals.insert_one({
        "festival": next_festival,
        "gender": "male",
        "image_url": image_url,
    })
    
    print("Saved to MongoDB:", {
            "festival": next_festival,
            "gender": "male",
            "image_url": image_url
        })

def store_to_mongodb(document):
    festivals.insert_one(document)
    print("Saved to MongoDB:", document)
    

# for prompt in male_prompts:
#     # generate image
#     print(prompt)
#     image_url = generate_image(prompt)
#     print("Image URL:", image_url)
#     # save it in mongodb with image_url
#     festivals.insert_one({
#         "festival": next_festival,
#         "gender": "male",
#         "image_url": image_url,
#     })
    
#     # add a delay of 10 seconds
#     time.sleep(10)
    
# for prompt in female_prompts:
#     # generate image
#     print(prompt)
#     image_url = generate_image(prompt)
#     print("Image URL:", image_url)
#     # save it in mongodb with image_url
#     festivals.insert_one({
#         "festival": next_festival,
#         "gender": "female",
#         "image_url": image_url,
#     })
    
#     # add a delay of 10 seconds
#     time.sleep(10)