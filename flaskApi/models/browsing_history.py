import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.metrics.pairwise import cosine_similarity

def content_based_filtering_browsing_history(data, userId, age, gender, city):
    # Convert the list of objects to a DataFrame
    data_df = pd.DataFrame(data)

    data_df.fillna(0, inplace=True) 
    # Preprocess categorical attributes
    categorical_cols = ['brand', 'category', 'color', 'usage']
    data_encoded = pd.get_dummies(data, columns=categorical_cols)

    # Normalize numerical attributes
    scaler = MinMaxScaler()
    data_encoded[['price', 'rating']] = scaler.fit_transform(data_encoded[['price', 'rating']])

    # Create item profiles
    item_profiles = data_encoded.drop(['userId','productId'], axis=1)

    # Create user profile (for a specific user)
    user_purchases = data_encoded[data_encoded['userId'] == userId]
    user_profile = user_purchases.drop(['userId'], axis=1).mean()

    # Calculate similarity
    similarity_scores = cosine_similarity(user_profile.values.reshape(1, -1), item_profiles)

    # Get recommended items
    num_recommendations = 5
    recommended_indices = similarity_scores.argsort()[0][-num_recommendations:][::-1]
    recommended_items = data.loc[recommended_indices]

    # Loop through each row and generate prompts
    images_url = []
    generatedImagesThreads = []

    for index, row in recommended_items.iterrows():
        prompt = f"My location is {city}, my age is {age} and gender is {gender}. Generate {row['category']} with color {row['color']} and {row['usage']} style."
        print(prompt)
        thread = threading.Thread(target=lambda url_list, p: url_list.append(generate_image(p)), args=(images_url, prompt))
        generatedImagesThreads.append(thread)
        thread.start()

    for thread in generatedImagesThreads:
        thread.join()

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


    





