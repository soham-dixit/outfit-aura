import random
from datetime import datetime, timedelta

# Sample data for generating random entries
brands = ["Nike", "Adidas", "Zara", "H&M", "Forever21", "Puma"]
categories = ["Tops", "Bottoms", "Dresses", "Footwear",
              "Accessories", "Traditional", "Western"]
colors = ["Red", "Black", "Blue", "White", "Pink", "Gray", "Green", "Yellow",
          "Orange", "Purple", "Brown", "Beige", "Maroon", "Navy Blue", "Multicolor"]
styles = ["Casual", "Sporty", "Formal", "Party", "Ethnic"]


def generate_random_purchase(user_id):
    product_id = f"P{random.randint(1000, 9999)}"
    purchase_date = datetime(2023, random.randint(
        1, 12), random.randint(1, 28)).strftime("%Y-%m-%d")
    brand = random.choice(brands)
    category = random.choice(categories)
    color = random.choice(colors)
    style = random.choice(styles)
    price = round(random.uniform(100, 5000), 0)
    rating = round(random.uniform(3.5, 5.0), 1)

    return [user_id, product_id, purchase_date, brand, category, color, style, price, rating]


user_id = "User1"
purchase_history = []

for _ in range(100):
    purchase_history.append(generate_random_purchase(user_id))

# Print the generated data
for purchase in purchase_history:
    print(purchase)

# Write the generated data to a csv file
with open("purchase_history.csv", "w") as f:
    f.write("user_id,product_id,purchase_date,brand,category,color,style,price,rating\n")
    for purchase in purchase_history:
        f.write(",".join(map(str, purchase)) + "\n")
