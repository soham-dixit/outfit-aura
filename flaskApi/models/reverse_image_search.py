import pickle
import tensorflow as tf
import numpy as np
from numpy.linalg import norm
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
import cv2
import requests
from rembg import remove  # Import rembg for background removal
from PIL import Image
import io

# Global variables to load only once
model = None
feature_list = None
filenames = None
neighbors = None

# Function to initialize model and data
def initialize_model_and_data():
    global model, feature_list, filenames, neighbors
    # Load the pickle files only once
    feature_list = np.array(pickle.load(open('models/embeddings_new.pkl', 'rb')))
    filenames = pickle.load(open('models/filenames.pkl', 'rb'))

    # Load the model once
    base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    base_model.trainable = False
    model = tf.keras.Sequential([
        base_model,
        GlobalMaxPooling2D()
    ])
    
    # Initialize NearestNeighbors only once
    neighbors = NearestNeighbors(n_neighbors=2, algorithm='brute', metric='euclidean')
    neighbors.fit(feature_list)

# Call this function once when the app starts
initialize_model_and_data()

def remove_background_with_rembg(image):
    # Use rembg to remove background and retain transparency
    img_no_bg = remove(image)
    img_no_bg_np = np.frombuffer(img_no_bg, np.uint8)
    img_no_bg = cv2.imdecode(img_no_bg_np, cv2.IMREAD_UNCHANGED)
    return img_no_bg

def save_image_with_transparency(image, save_path):
    # Ensure the image has an alpha channel (transparency)
    if image.shape[2] == 3:  # If there's no alpha channel, add one
        image = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
    
    # Convert to PIL Image and save as PNG to retain transparency
    pil_img = Image.fromarray(image)
    pil_img.save(save_path, format="PNG")
    print(f"Image saved at {save_path}")

def get_image_recommendation(image_url):
    # Model and pickled data are already initialized
    response = requests.get(image_url)
    img = cv2.imdecode(np.frombuffer(response.content, np.uint8), cv2.IMREAD_COLOR)
    
    # Remove background using rembg
    img_no_bg = remove_background_with_rembg(response.content)

    # Save the image without background and with transparency
    save_image_with_transparency(img_no_bg, 'image_without_background.png')

    # Resize and preprocess the image for the model
    img_no_bg_resized = cv2.resize(img_no_bg[:, :, :3], (224, 224))  # Remove alpha for model input
    expanded_img_array = np.expand_dims(img_no_bg_resized, axis=0)
    preprocessed_img = preprocess_input(expanded_img_array)
    
    # Predict the image embedding using the preloaded model
    result = model.predict(preprocessed_img).flatten()
    normalized_result = result / norm(result)
    
    # Find the nearest neighbors
    distances, indices = neighbors.kneighbors([normalized_result])

    # Retrieve the recommended image file name
    for file in indices[0][0:1]:
        file_name = filenames[file]
        numeric_part = file_name.split('/')[-1].split('.')[0]
        print(numeric_part)
    return numeric_part
