# Text Analytics Details Azure
key1 = "9578c0a31f7a4873b72122a1fa1cd758"
ep = "https://tagonizer-pro.cognitiveservices.azure.com/"
loc= "centralindia"

# Tagsets
# -https://www.amazon.in/boAt-BassHeads-100-Headphones-Black/dp/B071Z8M4KX/ref=zg_bs_electronics_1?_encoding=UTF8&psc=1&refRID=RSYYD4ABH2P4H14JRRS4
# -https://www.amazon.in/T2F-Boys-Sweatshirt-BYS-SS-04_Multicolor_3-4-Years/dp/B07VS3WTR4/ref=zg_bs_1967851031_2?_encoding=UTF8&psc=1&refRID=J8E6SWZ7F8R27HQNAKJC
# -https://www.amazon.in/Redmi-Sky-Blue-64GB-Storage/dp/B08697N43N/ref=zg_bs_1389432031_3?_encoding=UTF8&psc=1&refRID=67FX750DZFZ7ZCXFYBKN
tag1 = ["sound quality","value for money","price range","quality is good","year warranty","bass quality","worth for money","earphone","must buy","within 3 months","working properly","worth buying","left side"]
tag2=["value for money","good quality","years old", "bigger size", "quality is good","daily use","branded", "ones yrs old", "must buy", "perfect sweatshirt","old kid","hope this review helps", "worth buying","ordered yrs","little bit"]
tag3=["camera quality","battery life","value for money", "battery backup","price range","waste of money", "return policy","quality is very poor","budget phone","made in china","fingerprint reader","life is good"]

comment3=["Dont buy this product. Image quality is below average comparing with the specification. Useless camera. And there is NO RETURN POLICY and replacing with same mobile is big headache .DON’T buy this mobile", "Awesome", "Best buy at this price! The display quality is amazing and I do not have any complaint with the camera too. There is no other phone available at this price which comes with 4GB ram. You should go ahead with this.","i didn't upload photo ....for any reason but it is not up to the mark .1.display 4/52.cam 3/53.fing sens.. 4.5/5 4.processor 3/5 5.build quality 3.75/5 back panel is not good looking coz some self design as per my opinion in this price segment rs 9000 is good enough", "Good product value for money but ordering is too difficult within one minute soldout", "This phone is not value for money Its a downgraded phone of earlier phone launched in india. The camera is worst i ever seen in any redmi phone. Battery is ok. The display quality is very bad not hd. Watching videos on YouTube feels like watching 3gp videos. Dot notch display is ok in lookwise but not good in quality. Sometimes 4gb ram feels like 2gb. I am very disappointed by the camera quality of this phone. 12 megapixel feels like 2MP camera. Recently i am using redmi note 5 pro. And this phone is just downgraded phone by redmi .you cannot imagine low light photography in this phone. The back plastic body feels like a cheap phone. If you really need a phone there are many options in the market. If you are taking phone for the first and a beginner you can go for redmi 9 prime.","Very bad experience from Amazon. Very bad camera quality of the phone. I want to return the phone, but amazon is not taking back the phone. I don't want to purchase any product from amazon further. Leaving amazon app permanently", "Processor is bit slow, camera is below average except that everthing works fine. I personally don't like MIUI because of lots of ads and bloatwares. But, good budget range phone if you ignore/adjust this issues.", "Overall its good and satisfied for the price. Pros:1. Good Battery. 2. Best budget phone for 8999 with 4GB RAM and 64GB Internal Memory. The only drawback i felt is Camera. If you are looking for a better camera I would suggest to pick some other model.","best good product prive battry camera all very good","Product is best at this price but charging speed is very slow but we cannot accept more then this at this price", "Nice Performance Camera quality good light in weight multifeatures are excellent good gaming purpose", "It got so many bugs, the screen turned completely blank when i clicked on 'update system app', surprisingly NO heating issues, brightness is low For camera the rear is okay but front lacks details", "It is a good phone which is orange a nice colour I love it it features are better than other phones", "good", "Good product. Value for money phone. Everything is average. Display is good. Battery life is also good. I bought it for a employee of mine. Overall a good phone. 4/64 combo is hard to find in this price range. Exceeded my expectations.", "It is a just ok kind of phone. Camera is very pathetic. I did not expect this type of camera in this phone. Even my old redmi 4a mobile is better in camera than this. Apart from camera, I could see there is some lag in the screen while moving to different pages though it has 4GB RAM. Better choose some other phone than this. It has no notification light and has a micro USB charging port. No night mode in camera. Update after using it for 20 days: the phone gets lagging all the time no matter what ever the app you use. It is completely waste of money. Do not buy this mobile.", "Worst product ever as the camera quality is very poort rear as well as front. Amazon was not ready to take the return as they have a new policy now which is replacement policy so they will get you a replacement but won't take it back. Bought that in sale as had heard from friends that redmi phones are good but it ain't. Will suggest not to buy at all from Amazon as it's better to go and buy from the store atleast they take 500rs and will exchange the product. Speaker is poor you can not hear properly on speaker at all. Product is not worth in this price range as one can get better options by payin 1000-2000 bucks extra.","Best mobile ,best service currior boy", "I was having Samsung before same 4gb ram and battery back was very good but in redmi with out much of space or app ram speed is very very slow and battery back up draing with a day so not happy with the redmi product .I can return to Amazon with in 7 days but unfortunately our building is effected with covid possiitive so totally issulated no one should have contact with us so can't able to send the return mobile", "Overall good mobile...ut Camera not good as expected. Overall Performance is good . Value For Money", ""]

# Data Cleaning -- Comments
import re
for ix in comment3:
    ix = re.sub(r'[^A-Za-z ,.-]+', '', ix) #alphabets, ",", ".", "-" and spaces
    #print(ix)

#print(comment3)

# Client Authentication
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

def authenticate_client():
    ta_credential = AzureKeyCredential(key1)
    text_analytics_client = TextAnalyticsClient(
            endpoint=ep,
            credential=ta_credential)
    return text_analytics_client

client = authenticate_client()

#Keyword Extraction
reviews = {}
#Single comment test
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
        # print("Overall scores: positive={0:.2f}; neutral={1:.2f}; negative={2:.2f} \n".format(
        #     document.confidence_scores.positive,
        #     document.confidence_scores.neutral,
        #     document.confidence_scores.negative,
        # ))
        for sentence in document.sentences:
            # print("Sentence: {}".format(sentence.text))
            # print("Sentence sentiment: {}".format(sentence.sentiment))
            # print("Sentence score:\nPositive={0:.2f}\nNeutral={1:.2f}\nNegative={2:.2f}\n".format(
            #     sentence.confidence_scores.positive,
            #     sentence.confidence_scores.neutral,
            #     sentence.confidence_scores.negative,
            # ))
            for mined_opinion in sentence.mined_opinions:
                aspect = mined_opinion.aspect
                opinions=[]
                print("......'{}' aspect '{}'".format(aspect.sentiment, aspect.text))
                # print("......Aspect score:\n......Positive={0:.2f}\n......Negative={1:.2f}\n".format(
                #     aspect.confidence_scores.positive,
                #     aspect.confidence_scores.negative,
                # ))
                for opinion in mined_opinion.opinions:
                    opinions.append(opinion.text)

                #     print("......'{}' opinion '{}'".format(opinion.sentiment, opinion.text))
                #     print("......Opinion score:\n......Positive={0:.2f}\n......Negative={1:.2f}\n".format(
                #         opinion.confidence_scores.positive,
                #         opinion.confidence_scores.negative,
                #     ))
                #print(opinions)
                reviews.update({str(aspect.text):(str(aspect.sentiment),opinions)})
        #     print("\n")
        # print("\n")

documents = [ "Dont buy this product. Image quality is below average comparing with the specification. Useless camera. And there is NO RETURN POLICY and replacing with same mobile is big headache .DON’T buy this mobile"

    ]
#print(type(documents))
sentiment_analysis_with_opinion_mining_example(documents,client)

print(reviews)
