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

5. Run Flask Server
   ```bash
   python app.py
   ```

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
