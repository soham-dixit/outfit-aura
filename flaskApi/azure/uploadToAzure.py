# from azure.storage.blob import BlobServiceClient
import uuid
import firebase_admin
from firebase_admin import credentials, storage
from PIL import Image
import io
import os


firebase_initialized = False

class FirebaseUploader:
    def __init__(self, credential_path):
        global firebase_initialized
        if not firebase_initialized:
            cred = credentials.Certificate(credential_path)
            firebase_admin.initialize_app(cred, {'storageBucket': 'fashionkart-26db7.appspot.com'})
            firebase_initialized = True

    # def upload_to_firebase(self, image_path, folder_name):
    #     bucket = storage.bucket()
    #     destination_blob_name = f"{folder_name}/{str(uuid.uuid4())}.jpg"
    #     blob = bucket.blob(destination_blob_name)

    #     blob.upload_from_filename(image_path)

    #     blob_url = blob.public_url
    #     return blob_url

def upload_to_firebase(image_path, folder_name):
        bucket = storage.bucket()
        destination_blob_name = f"{folder_name}/{str(uuid.uuid4())}.jpg"
        blob = bucket.blob(destination_blob_name)

        blob.upload_from_filename(image_path)

        blob_url = blob.public_url
        return blob_url

def uploadToAzure(image):

    # Save the image temporarily before uploading
    print("Image is: ", image)
    temp_image_path = "output.jpg"

    # Read the image data from the BytesIO object
    image_data = image.getvalue()

    # Save the image data to the temporary file
    with open(temp_image_path, "wb") as temp_image_file:
        temp_image_file.write(image_data)

    # Upload the image file to Azure Blob Storage
    # firebase_uploader = FirebaseUploader('D:\\Projects\\Flipkart GRiD 5.0\\FashionKart\\chatbot\\actions\\firebase-admin-sdk.json')
    image_url = upload_to_firebase(temp_image_path, 'generatedImages')

    # Clean up: Delete the temporary image file
    os.remove(temp_image_path)

    return image_url
