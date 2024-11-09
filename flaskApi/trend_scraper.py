import requests
from bs4 import BeautifulSoup
import json

def scrape_trends(url):
    # Send a GET request to the URL
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    # Find all <h2> tags with class "wp-block-heading"
    trends = soup.find_all("h2", class_="wp-block-heading")
    
    # List to hold trend data
    trend_data = []
    
    # Loop through each trend
    for trend in trends:
        trend_name = trend.text.strip()  # Extract the trend name from <h2> tag
        
        # Get the two <p> tags immediately after the <h2>
        paragraphs = trend.find_next_siblings("p", limit=2)
        trend_description = ""
        
        # Extract text from both <p> tags, including <strong> content
        for p in paragraphs:
            # Get text excluding <strong> tags
            p_text = p.get_text(separator=" ", strip=True)
            trend_description += p_text + " "
        
        # Clean up the description
        trend_description = trend_description.strip()
        
        # Store trend data in a dictionary
        trend_data.append({
            "trend_name": trend_name,
            "trend_description": trend_description
        })
    
    # Convert the list of dictionaries to JSON format
    return json.dumps(trend_data, indent=4)

# Example usage
url = "https://iifd.in/the-future-of-style-top-5-emerging-fashion-trends-for-2024/"  # Replace with the actual URL
trends_json = scrape_trends(url)

# Print the scraped trend data in JSON format
print(trends_json)
