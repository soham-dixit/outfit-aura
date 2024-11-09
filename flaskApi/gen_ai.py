import requests
import google.generativeai as genai
import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def send_request_to_gemini(message, trends, previous_context=None):
    
    prompt = (
        "You are a professional fashion assistant. Help users find the perfect outfits based on their preferences, occasion, and style."
        "Consider the latest trends in your suggestions. Do not ask questions; instead, make confident recommendations based on what's known. "
        "Respond with emojis, keep it concise, avoid asking and responding with unnecessary details."
        f"Trends for 2024: {trends}."
    )
    if previous_context:
        prompt += f"\nRelevant previous details: {previous_context}."
    prompt += f"\nUser request: {message}"

    print("Prompt for Gemini:", prompt)
    response = genai.GenerativeModel("gemini-1.5-flash").generate_content(prompt)
    return response.text

def send_request_to_openai_image_gen(prompt):
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        n=1,
    )
    print("Image response from OpenAI:", response.data[0].url)
    return response.data[0].url

def summarize_conversation(conversation):
    model = genai.GenerativeModel("gemini-1.5-flash")
    
    prompt = (
        "Summarize the following conversation, focusing only on key fashion details like occasion, gender, and specific clothing preferences."
    )
    prompt += f"\nConversation: {conversation}"
    
    response = model.generate_content(prompt)
    return response.text

def get_recommendation_keywords(message):
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = (
        f"Extract fashion-related keywords from the following user request: {message}."
        " Include only relevant clothing or style-related keywords or phrases."
    )
    response = model.generate_content(prompt)
    return response.text