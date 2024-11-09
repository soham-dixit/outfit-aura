import requests
from bs4 import BeautifulSoup
import json
from fake_useragent import UserAgent
import time

def get_title(soup):
    """Extracts the product title from the soup object."""
    try:
        title = soup.find("span", attrs={"id": 'productTitle'})
        title_value = title.text
        title_string = title_value.strip()
    except AttributeError:
        title_string = ""
    return title_string


def get_image_link(soup):
    """Extracts the image link from the soup object."""
    try:
        img_div = soup.find("div", attrs={"id": 'imgTagWrapperId'})
        image_link = img_div.find("img")['src']
    except (AttributeError, KeyError):
        image_link = ""
    return image_link


def get_price(soup):
    """Extracts the product price from the soup object."""
    try:
        price = soup.find("span", attrs={"class": 'a-price-whole'}).string.strip()
    except AttributeError:
        price = ""
    return price


def get_rating(soup):
    """Extracts the product rating from the soup object."""
    try:
        rating = soup.find("span", attrs={"class": 'a-size-base a-color-base'}).string.strip()
    except AttributeError:
        rating = ""
    return rating


def get_availability(soup):
    """Extracts the product availability status from the soup object."""
    try:
        available = soup.find("div", attrs={'id': 'availability'})
        available = available.find("span").string.strip()
    except AttributeError:
        available = "Not Available"
    return available


def get_product_details(query):
    ua = UserAgent()
    # print(ua.chrome)
    """Scrapes product details from Amazon based on the search query."""
    URL = f"https://www.amazon.in/s?k={query}"
    HEADERS = {'User-Agent': ua.chrome, 'Accept-Language': 'en-US, en;q=0.5','Referer': 'https://www.google.com/', 'DNT': '1'}
    webpage = requests.get(URL, headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")

    # Extracting product links
    links = soup.find_all("a", attrs={'class': 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})
    links_list = [link.get('href') for link in links]

    product_details = []

    # Fetching details of the first three products
    for link in links_list[:3]:
        amazon_url = "https://www.amazon.in" + link
        HEADERS = {
            'User-Agent': ua.chrome,
            'Accept-Language': 'en-US, en;q=0.5',
            'Referer': 'https://www.google.com/',
            'DNT': '1'
        }
        time.sleep(3)
        webpage = requests.get(amazon_url, headers=HEADERS)
        soup = BeautifulSoup(webpage.content, "html.parser")

        title = get_title(soup)
        price = get_price(soup)
        rating = get_rating(soup)
        availability = get_availability(soup)
        image_link = get_image_link(soup)

        if title:
            product_details.append({
                'title': title,
                'price': price,
                'rating': rating,
                'availability': availability,
                'image': image_link,
                'link': amazon_url
            })

    # Convert product details to JSON format
    product_details_json = json.dumps(product_details, indent=4)

    if product_details:
        message = "Here are some recommendations:\n\n"
        for index, product in enumerate(product_details, 1):
            message += f"{index}. **{product['title']}**\n"
            if product['image']:
                message += f"   - [View Image]({product['image']})\n"
            if product['price']:
                message += f"   - Price: {'₹'+product['price']}\n"
            if product['rating']:
                message += f"   - Rating: {product['rating']}\n"
            if product['availability']:
                message += f"   - Availability: {product['availability']}\n"
            message += f"- [View on Amazon]({product['link']})\n\n"

        return message.strip()
    else:
        return "No product details found."



# # Example usage
search_string = "Cap"
product_data_json = get_product_details(search_string)

# Output JSON data
print(product_data_json)