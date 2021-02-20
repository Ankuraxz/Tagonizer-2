#Input Python
from fastapi import FastAPI, Query, status
from typing import List
import re
import itertools
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from difflib import SequenceMatcher
import os

key1 = os.environ["KEY"]
ep = os.environ["ENDPOINT"]
loc = os.environ["LOCATION"]

app = FastAPI(
    title="Tagonizer",
    description="API for Tagonizer",
    version="0.1.0",
    openapi_url="/api/v0.1.0/openapi.json",
    docs_url="/",
    redoc_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class data(BaseModel):
    comments: List[str] = Query(...)

def cleaner(comments):
    document=[]
    for ix in comments:
        ix = re.sub(r'[^A-Za-z ,.]+', '', ix) #alphabets, ",", ".", "-" and spaces
        ix = ix.lower()
        document.append(ix)
    return document

def authenticate_client():
    ta_credential = AzureKeyCredential(key1)
    text_analytics_client = TextAnalyticsClient(
            endpoint=ep,
            credential=ta_credential)
    return text_analytics_client



reviews ={}
def sentiment_analysis_with_opinion_mining_example(documents,client):
    j = None

    result = client.analyze_sentiment(documents, show_opinion_mining=True)
    doc_result = [doc for doc in result if not doc.is_error]

    # positive_reviews = [doc for doc in doc_result if doc.sentiment == "positive"]
    # negative_reviews = [doc for doc in doc_result if doc.sentiment == "negative"]

    # positive_mined_opinions = []
    # mixed_mined_opinions = []
    # negative_mined_opinions = []

    for document in doc_result:
        if document.sentiment == "negative":
            j = 0
        elif document.sentiment == "positive":
            j = 1
        else:
            j = 2

        for sentence in document.sentences:
            for mined_opinion in sentence.mined_opinions:
                count=0
                aspect = mined_opinion.aspect
                opinions=[]
                #print("......'{}' aspect '{}'".format(aspect.sentiment, aspect.text))
                for opinion in mined_opinion.opinions:
                    opinions.append(opinion.text)

                if str(aspect.text).lower() in reviews.keys():
                    count+=1
                    reviews.update({str(aspect.text).lower():(count,str(aspect.sentiment),opinions)})
                else:
                    reviews.update({str(aspect.text).lower():(count,str(aspect.sentiment),opinions)})


    return j



@app.post('/predict',  status_code=status.HTTP_201_CREATED)
async def predict(data: data):
    tags = {}
    
    if type(data.comments)==list:
        # print("got_list")
        # df = processor(data)
        document = cleaner(data.comments)
        client = authenticate_client()
        docSentiment = {}
        k = 0
        for ix in document:
            documents=[]
            
            if len(ix) >=5000:
                documents.append(ix[:5000]) #Limiting 5000 chars
                docSentiment[k] = sentiment_analysis_with_opinion_mining_example(documents,client)
            else:
                documents.append(ix)
                docSentiment[k] = sentiment_analysis_with_opinion_mining_example(documents,client)
            k+=1
        
        tags = {k: v for k, v in sorted(reviews.items(), key=lambda item: item[1],reverse=True)}
        keys = tags.keys()
        reviews.clear()

        s = SequenceMatcher(None)
        # print(keys)
        reduntant=set()
        limit = 0.60
        for key in keys:
            s.set_seq2(key)
            for iy in keys:
                # wordx = key
                # wordy = iy
                s.set_seq1(iy)
                if key != iy: # Not The same words
                    if (s.ratio()>=limit and len(s.get_matching_blocks())==2): #matched word
                        reduntant.add(iy)

        for ix in reduntant:
        # print(ix)
            tags.pop(ix)
        revResult = {}

        prediction = list(tags.items())
        docResult = {
            "Status" : "Something Went Wrong"
        }

        for t,u in zip(tags.keys(), tags.values()):
            if u[1] == "negative":
                revResult[t] = 0
            elif u[1] == "positive":
                revResult[t] = 1
            else:
                revResult[t] = 2
        if len(revResult.items()) <= 10:
            docResult = {
                "reviews": docSentiment,
                "tags": revResult
            }
        else:
            docResult = {
                "reviews": docSentiment,
                "tags": dict(itertools.islice(revResult.items(), 10))
            }

        return docResult

        

    else:
        return("PASS A LIST OF REVIEWS") #-->testing

