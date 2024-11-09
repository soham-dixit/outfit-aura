import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
import threading

from azure.stability import generate_image
from models.reverse_image_search import get_image_recommendation

def content_based_filtering_history(data, userId, age, gender, city, specificDate):
    print("content filtering data", data)
    # Convert the list of objects to a DataFrame
    data_df = pd.DataFrame(data)
    
    # Handle missing values
    data_df.fillna(0, inplace=True)  # Replace NaN with 0
    
    # Encode missing categorical values
    data_df.fillna('missing', inplace=True) 
    
    # Preprocess categorical attributes
    categorical_cols = ['brand', 'category', 'color', 'productUsage']
    data_encoded = pd.get_dummies(data_df, columns=categorical_cols)

    print("data encoded", data_encoded)

    # Normalize numerical attributes
    scaler = MinMaxScaler()
    data_encoded[['price', 'rating']] = scaler.fit_transform(data_encoded[['price', 'rating']])

    # Create item profiles
    item_profiles = data_encoded.drop(['userId', 'productId', specificDate], axis=1)

    # Create user profile (for a specific user)
    user_purchases = data_encoded[data_encoded['userId'] == userId]
    user_profile = user_purchases.drop(['userId', 'productId', specificDate], axis=1).mean()
    user_profile.fillna(0, inplace=True) 

    print("user profile", user_profile)
    print("item profiles", item_profiles)

    # Calculate similarity
    similarity_scores = cosine_similarity(user_profile.values.reshape(1, -1), item_profiles)

    # Get recommended items
    num_recommendations = 5
    recommended_indices = similarity_scores.argsort()[0][-num_recommendations:][::-1]
    recommended_items = data_df.loc[recommended_indices]

    # Loop through each row and generate prompts
    images_url = []
    generatedImagesThreads = []

    # Function to generate image and append URL to the list if it's not None
    # def generate_and_append_image_url(url_list, prompt):
    #     image_url = generate_image(prompt)
    #     if image_url is not None:
    #         url_list.append(image_url)

    # # Iterate over recommended items and generate images in parallel threads
    # for index, row in recommended_items.iterrows():
    #     prompt = f"My location is {city}, my age is {age} and gender is {gender}. Generate {row['category']} with color {row['color']} and {row['productUsage']} style."
    #     print(prompt)
    #     thread = threading.Thread(target=generate_and_append_image_url, args=(images_url, prompt))
    #     generatedImagesThreads.append(thread)
    #     thread.start()

    # # Wait for all threads to complete
    # for thread in generatedImagesThreads:
    #     thread.join()

    def generate_and_append_image_url(url_list, prompt):
        image_url = generate_image(prompt)
        if image_url is not None:
            url_list.append(image_url)

# Iterate over recommended items and generate images sequentially
    for index, row in recommended_items.iterrows():
        prompt = f"My location is {city}, my age is {age} and gender is {gender}. Generate {row['category']} with color {row['color']} and {row['productUsage']} style."
        print(prompt)
        generate_and_append_image_url(images_url, prompt)


    # for index, row in recommended_items.iterrows():
    #     prompt = f"My location is {city}, my age is {age} and gender is {gender}. Generate {row['category']} with color {row['color']} and {row['productUsage']} style."
    #     print(prompt)
    #     thread = threading.Thread(target=lambda url_list, p: url_list.append(generate_image(p)), args=(images_url, prompt))
    #     generatedImagesThreads.append(thread)
    #     thread.start()

    # for thread in generatedImagesThreads:
    #     thread.join()

    # traverse the images_url list and call the reverse image search API using threading
    recommendedImagesThreads = []
    product_ids = []
    for url in images_url:
        thread = threading.Thread(target=lambda id_list, u: id_list.append(get_image_recommendation(u)), args=(product_ids, url))
        recommendedImagesThreads.append(thread)
        thread.start()

    for thread in recommendedImagesThreads:
        thread.join()

    # return the product_ids list and the images_url list
    return [product_ids, images_url]


    



