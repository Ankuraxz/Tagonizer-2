import logging
import azure.functions as func
import re
import os
import itertools
from msrest.authentication import CognitiveServicesCredentials
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
import json
from difflib import SequenceMatcher

key1 = os.environ["KEY"]
ep = os.environ["ENDPOINT"]
loc = os.environ["LOCATION"]


def cleaner(comments):
    document = []
    for ix in comments:
        ix = re.sub(r'[^A-Za-z ,.]+', '', ix)  # alphabets, ",", ".", "-" and spaces
        ix = ix.lower()
        document.append(ix)
    return document

def authenticate_client():
    ta_credential = AzureKeyCredential(key1)
    text_analytics_client = TextAnalyticsClient(
        endpoint=ep,
        credential=ta_credential)
    return text_analytics_client

def sentiment_analysis_with_opinion_mining_example(documents, client, reviews):
    j = None

    result = client.analyze_sentiment(documents, show_opinion_mining=True)
    doc_result = [doc for doc in result if not doc.is_error]

    for document in doc_result:
        if document.sentiment == "negative":
            j = 0
        elif document.sentiment == "positive":
            j = 1
        else:
            j = 2

        for sentence in document.sentences:
            for mined_opinion in sentence.mined_opinions:
                count = 0
                aspect = mined_opinion.aspect
                opinions = []
                # print("......'{}' aspect '{}'".format(aspect.sentiment, aspect.text))
                for opinion in mined_opinion.opinions:
                    opinions.append(opinion.text)

                if str(aspect.text).lower() in reviews.keys():
                    count += 1
                    reviews.update({str(aspect.text).lower(): (count, str(aspect.sentiment), opinions)})
                else:
                    reviews.update({str(aspect.text).lower(): (count, str(aspect.sentiment), opinions)})

    return j, reviews


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    comments = req.params.get('comments')
    if not comments:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            comments = req_body.get('comments')

    if type(comments) == list :
        reviews = {}
        document = cleaner(comments)

        client = authenticate_client()
        docSentiment = {}
        Senti = []
        k = 0
        for ix in document:
            documents = []

            if len(ix) >= 5000:
                documents.append(ix[:5000])  # Limiting 5000 chars
                docSentiment[k], reviews = sentiment_analysis_with_opinion_mining_example(documents, client, reviews)
            else:
                documents.append(ix)
                docSentiment[k], reviews = sentiment_analysis_with_opinion_mining_example(documents, client, reviews)
            k += 1

        tags = {k: v for k, v in sorted(reviews.items(), key=lambda item: item[1], reverse=True)}
        keys = tags.keys()
        reviews.clear()

        s = SequenceMatcher(None)
        # print(keys)
        reduntant = set()
        limit = 0.60
        for key in keys:
            s.set_seq2(key)
            for iy in keys:
                s.set_seq1(iy)
                if key != iy:  # Not The same words
                    if (s.ratio() >= limit and len(s.get_matching_blocks()) == 2):  # matched word
                        reduntant.add(iy)

        for ix in reduntant:
            # print(ix)
            tags.pop(ix)
        revResult = {}

        prediction = list(tags.items())
        docResult = {
            "Status": "Something Went Wrong"
        }
        for t, u in zip(tags.keys(), tags.values()):
            if u[1] == "negative":
                revResult[t] = 0
            elif u[1] == "positive":
                revResult[t] = 1
            else:
                revResult[t] = 2
        # print(docSentiment)
        Senti = list(docSentiment.values())
        if Senti.count(0) > Senti.count(1):
            overall = 0  # "Negative"
        elif Senti.count(1) > Senti.count(0):
            overall = 1  # "Positive"
        else:
            overall = 2  # "Moderate"

        if len(revResult.items()) <= 10:
            docResult = {
                "Product_Sentiment": overall,
                "reviews": docSentiment,
                "tags": revResult
            }
        else:
            docResult = {
                "Product_Sentiment": overall,
                "reviews": docSentiment,
                "tags": dict(itertools.islice(revResult.items(), 10))
            }


        return json.dumps(docResult)

    else:
        return func.HttpResponse("Failure: Pass List/Array")

