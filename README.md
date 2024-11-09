# Outfit Aura

*Your Style, Your Story: Fashion Reimagined with GenAI*

Outfit Aura is a GenAI-powered fashion platform that enhances online shopping with personalized outfit recommendations, a virtual try-on feature, and culturally resonant fashion suggestions. Users can explore styles, receive real-time advice, and shop directly through Amazon, making fashion discovery interactive and confidence-boosting.

### Key Features
- **Personalized Style Recommendations**
- **Conversational AI for Fashion Advice**
- **Virtual Try-On for Confidence in Purchases**
- **Up-to-Date Fashion Trends**
- **Amazon Integration for Easy Shopping**
- **Cultural Sensitivity with Upcoming Festive Suggestions**

### Technologies Used

ReactJS, Node.js, Flask, MongoDB, SQL, Firebase, OpenAI, Stable Diffusion, Gemini

---

# Project Setup Guide

## Dataset

1. Download the dataset from [Kaggle](https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-dataset).
2. Extract the downloaded dataset in `website/server/product_images`.
3. Copy the `images` folder from the extracted dataset (`fashion-dataset`) to `website/server/product_images`.

## Recommendation Model

1. Download the trained model zip file from [Google Drive](https://drive.google.com/file/d/1AA73j9EM7TCJn579Zy86rFjyM8z72A_7/view?usp=sharing).
2. Extract the zip file in `flaskApi/models/`.

## Flask Server

1. Navigate to Flask API Directory

   ```bash
   cd flaskApi
   ```

2. Create Python Virtual Environment

   ```bash
   python -m venv env
   ```

3. Activate Virtual Environment
   On macOS/Linux:

   ```bash
   source env/bin/activate
   ```

   On Windows:

   ```bash
   env/Scripts/activate
   ```

4. Install Requirements

   ```bash
   pip install -r requirements.txt
   ```

5. Set Up Environment Variables
Create a .env file in the flaskApi directory to store environment variables.
   
      ```bash
      touch .env
      ```
   
      Add the following environment variables to the .env file.
   
      ```bash
      OPENAI_API_KEY=
      GEMINI_API_KEY=
      SEGMIND_API_KEY=
      ```


6. Run Flask Server
   ```bash
   python app.py
   ```

## MYSQL Database Setup

1. Ensure MySQL is installed and running on your system

2. In the MySQL client, create a new database for the project
   
      ```sql
      CREATE DATABASE fashionkart;
      ```

3. Import the fashionkart.sql file located in the root directory to set up the initial database structure and sample data
   
   ```bash
   mysql -u username -p fashionkart < fashionkart.sql
   ```
   
   Replace username with your MySQL username and provide your password when prompted.

## Website Server

1. Navigate to Website Server Directory

   ```bash
   cd website/server
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Run Development Server
   ```bash
   npm run dev
   ```

## Access the website

Visit [http://localhost:8000/](http://localhost:8000/) in your web browser to access.
