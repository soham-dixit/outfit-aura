import requests
from bs4 import BeautifulSoup
import json

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
    """Scrapes product details from Amazon based on the search query."""
    URL = f"https://www.amazon.in/s?k={query}"
    # HEADERS = {'User-Agent': '', 'Accept-Language': 'en-US, en;q=0.5'}
    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'Cookie': 'session-id=261-3895266-5041006; ubid-acbin=261-0208567-3617638; s_nr=1696746212308-New; s_vnum=2128746212308%26vn%3D1; s_dslv=1696746212309; s_nr365=1712474695314-New; s_vnc365=1744010695315%26vn%3D1; i18n-prefs=INR; lc-acbin=en_IN; at-acbin=Atza|IwEBIO3e12nljC4IveLEzWrBGTyr7-lvkLD3GlT2FXMhdUwRtsX8sx01wO9tXbSevAF_k1A_LJhKij9qzoih8dyLfRS2Ynj4YTv9QevI7iQYie2WEKkVUUEu3JK0gzjq1UVCnjB_fX9APqfpEHJTjt456AkLjoBFojkHXhXkjlXeUxBEbZFykvu8qyFUC1-IzDYZdp3jSzfNSdrQZ2_4Thj9uKRnI9vx3fSCvIrLO1JBZp42cQ; sess-at-acbin="2JKu83P3RL1BoPr4GnaGD4WJYazl+9rnj6bXFTKSaWo="; sst-acbin=Sst1|PQEMGa5A9vmQuDUxEZAVRa92CYJd1nWRWwrLfgIGTdD1jfoyEK0_b1nVJCRDRAzw2D7F3YBh_EotEQ1n77Xtfd2gQ8gGnjd-W5ngiLO7r6EGAvH8KFD9laNYhlLyh0Dtp-fDXDSKLaT3XhKadHPaTNamGUQLr7C8ZkC8cIWCX5u9hKhrDMunaBE4GwwOONmVp3hv3BO3pV_mnkrG9WhohTsGn_KRxpjrClV-atvLAtCl6tEjTDA9qxOJ2nrAce-KqpHnDgjwBwWVmB6CT_2GWuADI7K99tpHi8iShUe0vgdzBKQ; AMCV_A7493BC75245ACD20A490D4D%40AdobeOrg=1585540135%7CMCIDTS%7C20034%7CMCMID%7C17604896417187337583628946664247218309%7CMCAAMLH-1731521267%7C12%7CMCAAMB-1731521267%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1730923667s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.4.0; ttc=1730916467902; s_ev15=%5B%5B%27NSGoogle%27%2C%271730916481435%27%5D%5D; x-acbin="CFewgtIZdoe?bzB@H27SYIY8bBbQ@YeF7GKc?ciwiUdyt8c?MQlH9Q5S9G2r5Qvp"; session-token=Rqp1nqBpI8XY7vOhUiysrE0Xp/pU59aBq09MWISI32bFHfxMrU7ces7hX5pc5zxuDyaqslionBouW2bxOzywkPvTef8EyC2lgyYMluIIvEwKl0/90Dj8fxGGBQqNPCGxunckX3k8hI7u1bp19+l8QTANWshc5Xdb5s0NKYXq8y5VzRpsgM84/kw/GXI7BakcDnq9UxdoxAKLeT2yBRb2k5WaLZExaxb6f6pe5Rlnh96NbYsFLZsL4s9rJ+HxfAxA1An5Q+5YY2nZDZxZhMrIdh2HmmAEx7KPze4Pr6fRnt3XzDLDTThlH4VHb/geFEuCLRDZgE/byCkVZIiSHfgrUqYZuzR0Reincqyb4+t+8HzTrk+jaPe7YRRoVEzRXKPt; session-id-time=2082787201l',
        'Accept-Language': 'en-US, en;q=0.5',
        'Origin': 'https://www.amazon.in',
    }
    webpage = requests.get(URL, headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")
    # print the html
    print(soup.prettify())

    # Extracting product links
    links = soup.find_all("a", attrs={'class': 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal'})
    links_list = [link.get('href') for link in links]

    product_details = []

    # Fetching details of the first three products
    for link in links_list[:3]:
        amazon_url = "https://www.amazon.in" + link
        HEADERS = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
            'Cookie': 'session-id=261-3895266-5041006; ubid-acbin=261-0208567-3617638; s_nr=1696746212308-New; s_vnum=2128746212308%26vn%3D1; s_dslv=1696746212309; s_nr365=1712474695314-New; s_vnc365=1744010695315%26vn%3D1; i18n-prefs=INR; lc-acbin=en_IN; at-acbin=Atza|IwEBIO3e12nljC4IveLEzWrBGTyr7-lvkLD3GlT2FXMhdUwRtsX8sx01wO9tXbSevAF_k1A_LJhKij9qzoih8dyLfRS2Ynj4YTv9QevI7iQYie2WEKkVUUEu3JK0gzjq1UVCnjB_fX9APqfpEHJTjt456AkLjoBFojkHXhXkjlXeUxBEbZFykvu8qyFUC1-IzDYZdp3jSzfNSdrQZ2_4Thj9uKRnI9vx3fSCvIrLO1JBZp42cQ; sess-at-acbin="2JKu83P3RL1BoPr4GnaGD4WJYazl+9rnj6bXFTKSaWo="; sst-acbin=Sst1|PQEMGa5A9vmQuDUxEZAVRa92CYJd1nWRWwrLfgIGTdD1jfoyEK0_b1nVJCRDRAzw2D7F3YBh_EotEQ1n77Xtfd2gQ8gGnjd-W5ngiLO7r6EGAvH8KFD9laNYhlLyh0Dtp-fDXDSKLaT3XhKadHPaTNamGUQLr7C8ZkC8cIWCX5u9hKhrDMunaBE4GwwOONmVp3hv3BO3pV_mnkrG9WhohTsGn_KRxpjrClV-atvLAtCl6tEjTDA9qxOJ2nrAce-KqpHnDgjwBwWVmB6CT_2GWuADI7K99tpHi8iShUe0vgdzBKQ; AMCV_A7493BC75245ACD20A490D4D%40AdobeOrg=1585540135%7CMCIDTS%7C20034%7CMCMID%7C17604896417187337583628946664247218309%7CMCAAMLH-1731521267%7C12%7CMCAAMB-1731521267%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1730923667s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C4.4.0; ttc=1730916467902; s_ev15=%5B%5B%27NSGoogle%27%2C%271730916481435%27%5D%5D; x-acbin="CFewgtIZdoe?bzB@H27SYIY8bBbQ@YeF7GKc?ciwiUdyt8c?MQlH9Q5S9G2r5Qvp"; session-token=Rqp1nqBpI8XY7vOhUiysrE0Xp/pU59aBq09MWISI32bFHfxMrU7ces7hX5pc5zxuDyaqslionBouW2bxOzywkPvTef8EyC2lgyYMluIIvEwKl0/90Dj8fxGGBQqNPCGxunckX3k8hI7u1bp19+l8QTANWshc5Xdb5s0NKYXq8y5VzRpsgM84/kw/GXI7BakcDnq9UxdoxAKLeT2yBRb2k5WaLZExaxb6f6pe5Rlnh96NbYsFLZsL4s9rJ+HxfAxA1An5Q+5YY2nZDZxZhMrIdh2HmmAEx7KPze4Pr6fRnt3XzDLDTThlH4VHb/geFEuCLRDZgE/byCkVZIiSHfgrUqYZuzR0Reincqyb4+t+8HzTrk+jaPe7YRRoVEzRXKPt; session-id-time=2082787201l',
            'Accept-Language': 'en-US, en;q=0.5',
            'Origin': 'https://www.amazon.in',
        }
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
