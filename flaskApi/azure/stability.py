import requests
import io
from PIL import Image, UnidentifiedImageError

from azure.uploadToAzure import uploadToAzure

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

def generate_image(prompt):
    image_bytes = query({
        "inputs": f"{prompt}",
    })
    
    if image_bytes is None:
        # Handle the case where the API response is None
        return None

    try:
        # Attempt to open the image with PIL
        image = Image.open(io.BytesIO(image_bytes))
        # image.show()

        # Save the image to Azure Blob Storage
        image_stream = io.BytesIO()
        image.save(image_stream, format="JPEG")
        image_stream.seek(0)

        image_url = uploadToAzure(image_stream)
        return image_url
    except UnidentifiedImageError as e:
        # Handle the case where the image cannot be identified
        print("Error:", e)
        return None
