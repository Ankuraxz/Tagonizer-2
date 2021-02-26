from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials

# Credentials
Key = "c4ee7edab2c64958b4b139fc3d1e2edd"
ep = "https://tag-visio-pro.cognitiveservices.azure.com/"
loc = "centralindia"


# def describer(url,client):
#     print("===== Describe an image - remote =====")
#     # Call API
#     description_results = client.describe_image(url)

#     # Get the captions (descriptions) from the response, with confidence level
#     print("Description of remote image: ")
#     if (len(description_results.captions) == 0):
#         print("No description detected.")
#     else:
#         for caption in description_results.captions:
#             print("'{}' with confidence {:.2f}%".format(caption.text, caption.confidence * 100))


def categorizer(url, client):
    print("===== Categorize an image - remote =====")
    # Select the visual feature(s) you want.
    remote_image_features = ["categories"]
    # Call API with URL and features
    categorize_results_remote = client.analyze_image(url, remote_image_features)

    # Print results with confidence score
    print("Categories from remote image: ")
    if len(categorize_results_remote.categories) == 0:
        print("No categories detected.")
    else:
        for category in categorize_results_remote.categories:
            print("'{}' with confidence {:.2f}%".format(category.name, category.score * 100))


def tagger(url, client):
    print("===== Tag an image - remote =====")
    # Call API with remote image
    tags_result_remote = client.tag_image(url)

    # Print results with confidence score
    print("Tags in the remote image: ")
    if len(tags_result_remote.tags) == 0:
        print("No tags detected.")
    else:
        for tag in tags_result_remote.tags:
            print("'{}' with confidence {:.2f}%".format(tag.name, tag.confidence * 100))


# def object_detect(url,client):

#     print("===== Detect Objects - remote =====")

#     # Call API with URL
#     detect_objects_results_remote = client.detect_objects(url)

#     # Print detected objects results with bounding boxes
#     print("Detecting objects in remote image:")
#     if len(detect_objects_results_remote.objects) == 0:
#         print("No objects detected.")
#     else:
#         for object in detect_objects_results_remote.objects:
#             print("object at location {}, {}, {}, {}".format( \
#             object.rectangle.x, object.rectangle.x + object.rectangle.w, \
#             object.rectangle.y, object.rectangle.y + object.rectangle.h))


def brand_detect(url, client):
    print("===== Detect Brands - remote =====")
    # Select the visual feature(s) you want
    remote_image_features = ["brands"]
    # Call API with URL and features
    detect_brands_results_remote = client.analyze_image(url, remote_image_features)

    print("Detecting brands in remote image: ")
    if len(detect_brands_results_remote.brands) == 0:
        print("No brands detected.")
    else:
        for brand in detect_brands_results_remote.brands:
            print("'{}' brand detected with confidence {:.1f}% ".format(
                brand.name, brand.confidence * 100))


# Client
computervision_client = ComputerVisionClient(ep, CognitiveServicesCredentials(Key))
# example list
img = ['https://images-na.ssl-images-amazon.com/images/I/617CSNAahuL._SL256_.jpg',
       'https://images-na.ssl-images-amazon.com/images/I/51XifZb3kTL._SL256_.jpg']

# Downloading Images locally:

# for ix in range(len(img)):
#     # name = "img_"+ str(ix)     ### Needs to be released in api
#     # name = wget.download(img[ix])   ### Requests is better

for ix in img:
    categorizer(ix, computervision_client)
    tagger(ix, computervision_client)
    brand_detect(ix, computervision_client)
