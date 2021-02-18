#Input Python
from fastapi import FastAPI
import joblib
import uvicorn
import time
import re
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import collections
from difflib import SequenceMatcher

# Text Analytics Details Azure
key1 = "9578c0a31f7a4873b72122a1fa1cd758"
ep = "https://tagonizer-pro.cognitiveservices.azure.com/"
loc= "centralindia"

app = FastAPI()

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

client = authenticate_client()

reviews ={}
def sentiment_analysis_with_opinion_mining_example(documents,client):
    
    result = client.analyze_sentiment(documents, show_opinion_mining=True)
    doc_result = [doc for doc in result if not doc.is_error]

    positive_reviews = [doc for doc in doc_result if doc.sentiment == "positive"]
    negative_reviews = [doc for doc in doc_result if doc.sentiment == "negative"]

    positive_mined_opinions = []
    mixed_mined_opinions = []
    negative_mined_opinions = []

    for document in doc_result:
        print("Document Sentiment: {}".format(document.sentiment))
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

@app.get('/')
def index():
    return {'message': 'TAGONIZER'}


@app.get('/predict/{data}')
def predict_cluster(document,client):
    
    if type(data)==list: 
        print("got_list")
        # df = processor(data)
        document = cleaner(data)
        for ix in document:
            documents=[]
            
            if len(ix) >=5000:
                documents.append(ix[:5000]) #Limiting 5000 chars
                sentiment_analysis_with_opinion_mining_example(documents,client)
        #time.sleep(1000)
            else:
                documents.append(ix)
                sentiment_analysis_with_opinion_mining_example(documents,client)
        
        tags = {k: v for k, v in sorted(reviews.items(), key=lambda item: item[1],reverse=True)}
        keys = tags.keys()

        s = SequenceMatcher(None)
        # print(keys)
        reduntant=[]
        limit = 0.60
        for key in keys:
            s.set_seq2(key)
            for iy in keys:
                # wordx = key
                # wordy = iy
                s.set_seq1(iy)
                if key != iy: # Not The same words
                    if (s.ratio()>=limit and len(s.get_matching_blocks())==2): #matched word
                        reduntant.append(iy)

        for ix in reduntant:
        # print(ix)
            tags.pop(ix)

        prediction = list(tags.items())
        if len(prediction)<=10:
            return(prediction)
        else:
            prediction = list(tags.items())[:10]
            return(prediction)

        

    else:
        return("PASS A LIST OF REVIEWS") #-->testing


# if __name__ == '__main__':
#     uvicorn.run(app, host='127.0.0.1', port = 8000)
