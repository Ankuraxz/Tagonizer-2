#imports
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials

# Credentials
Key = "c4ee7edab2c64958b4b139fc3d1e2edd"
ep = "https://tag-visio-pro.cognitiveservices.azure.com/"
loc = "centralindia"

# #Functions
# def categorizer(url, client):
#     categories=[]
#     print("===== Categorize an image - remote =====")
#     # Select the visual feature(s) you want.
#     remote_image_features = ["categories"]
#     # Call API with URL and features
#     categorize_results_remote = client.analyze_image(url, remote_image_features)
#     if len(categorize_results_remote.categories) != 0:
#         for category in categorize_results_remote.categories:
#             categories.append(category.name)
    
#     return categories
 

def tagger(url, client):
    tags =[]
    # print("===== Tag an image - remote =====")
    tags_result_remote = client.tag_image(url)
    if len(tags_result_remote.tags) != 0:
        for tag in tags_result_remote.tags:
            if tag.confidence >= 0.45: #Atleast 40% confidence score
                tags.append(tag.name)
    
    return tags

#Driver Function
# Client
computervision_client = ComputerVisionClient(ep, CognitiveServicesCredentials(Key))
# example list
user_img = ['https://images-na.ssl-images-amazon.com/images/I/617CSNAahuL._SL256_.jpg',
       'https://images-na.ssl-images-amazon.com/images/I/51XifZb3kTL._SL256_.jpg', "https://images-na.ssl-images-amazon.com/images/I/71WLHjc2KnL._SL256_.jpg", "https://images-na.ssl-images-amazon.com/images/I/81vRJ1CTFCL._SL256_.jpg", "https://images-na.ssl-images-amazon.com/images/I/51wobYyZRAL._SL256_.jpg", "https://images-na.ssl-images-amazon.com/images/I/81hgfj7FgLL._SL256_.jpg", "https://images-na.ssl-images-amazon.com/images/I/712Q-6DCGiL._SL256_.jpg", "https://images-na.ssl-images-amazon.com/images/I/719icuNqCqL._SL256_.jpg"]

seller_img = ['https://images-na.ssl-images-amazon.com/images/I/71T0KJFxCHL._SY606_.jpg', "https://images-na.ssl-images-amazon.com/images/I/71SFiUok-NL._SY445_.jpg", "https://images-na.ssl-images-amazon.com/images/I/71gljD6pGtL._SY445_.jpg", "https://images-na.ssl-images-amazon.com/images/I/513iLmPNm9L._SX425_.jpg"]

seller_tag =set() #set to gather unique tags from seller images
for ix in seller_img:
    tags_ = tagger(ix, computervision_client)
    for iw in tags_:
        iw = iw.lower()
        seller_tag.add(iw)

good_images=[] #to be returned by api
for iy in user_img:
    tags = tagger(iy, computervision_client)
    #print(tag)
    for iz in tags:
        iz = iz.lower()
        if iz in seller_tag:
            good_images.append(iy)
            break


print(good_images)