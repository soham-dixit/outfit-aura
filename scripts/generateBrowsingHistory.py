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
    brand = random.choice(brands)
    category = random.choice(categories)
    color = random.choice(colors)
    style = random.choice(styles)

    return [user_id, brand, category, color, style]


user_id = "User1"
purchase_history = []

for _ in range(100):
    purchase_history.append(generate_random_purchase(user_id))

# Print the generated data
for purchase in purchase_history:
    print(purchase)

# Write the generated data to a csv file
with open("browsing_history.csv", "w") as f:
    f.write("user_id,brand,category,color,style\n")
    for purchase in purchase_history:
        f.write(",".join(map(str, purchase)) + "\n")
