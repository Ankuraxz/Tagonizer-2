import logging
import azure.functions as func
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
from azure.core.credentials import AzureKeyCredential
from functools import lru_cache
import asyncio
import os
import json

KEY = os.environ["VKEY"]
ENDPOINT = os.environ["VENDPOINT"]
LOCATION = os.environ["LOCATION"]

computervision_client = ComputerVisionClient(ENDPOINT, CognitiveServicesCredentials(KEY))

def tagger(url, client):
    tags = []
    # print("===== Tag an image - remote =====")
    tags_result_remote = client.tag_image(url)
    if len(tags_result_remote.tags) != 0:
        for tag in tags_result_remote.tags:
            if tag.confidence >= 0.45:  # Atleast 45% confidence score
                tags.append(tag.name)

    return tags

def url_cleaner(url):
    id = url[49:].split(".")[0]
    return (url[:49] + id + ".jpg")

# def authenticate_client():
#     return ComputerVisionClient(ENDPOINT, CognitiveServicesCredentials(KEY))

@lru_cache(maxsize = 128)
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    seller_img = req.params.get('seller_img')
    if not seller_img:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:

            seller_img = req_body.get('seller_img')

    customer_img = req.params.get('customer_img')
    if not customer_img:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            customer_img = req_body.get('customer_img')
    ####
    if type(seller_img) ==list and type(customer_img)==list:
        s_tags_set = set()
        good_images = []
        c_tags = []

        # with authenticate_client() as computervision_client:

        seller_img_resized = []
        for ix in seller_img:
            ix = url_cleaner(ix)
            seller_img_resized.append(ix)
            s_tags = tagger(ix, computervision_client)
            for iw in s_tags:
                iw = iw.lower()
                s_tags_set.add(iw)

        for iy in customer_img:
            if "jpg" in iy:
                iy = url_cleaner(iy)
                c_tags = tagger(iy, computervision_client)

            for iz in c_tags:
                iz = iz.lower()
                if iz in s_tags_set:
                    good_images.append(iy)
                    break

        if len(good_images) == 0:
            good_images = seller_img_resized

        docResult = {
            "Images": good_images
        }

        return json.dumps(docResult)

    else:
        return func.HttpResponse("Failure: Pass Lists/Arrays")


