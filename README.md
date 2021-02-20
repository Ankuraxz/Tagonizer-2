<p align="center">
  <a href="https://github.com/ankuraxz/tagonizer/">
    <img src="https://raw.githubusercontent.com/ankuraxz/tagonizer/main/logo.png" alt="Tagonizer" width="150" height="150"> 
  </a>
</p>

<p align="center">
  <a href="https://github.com/ankuraxz/tagonizer/">
   <img src="https://madewithlove.now.sh/in?heart=true&colorA=%23ff0000&colorB=%23050505&template=plastic" alt="Made with love in India">
    <img alt="GitHub" src="https://img.shields.io/github/license/ankuraxz/tagonizer?style=plastic">
    <img src="https://img.shields.io/badge/Made%20with%20%E2%9D%A4%EF%B8%8F%20by%20-Majestic%20Coders-red&template=plastic">
  </a>
</p>

<p align="center">
  <a href="https://github.com/ankuraxz/tagonizer/">
    <img src ="https://img.shields.io/github/issues-raw/Ankuraxz/Tagonizer" alt = "Open Issues">
    <img src ="https://img.shields.io/github/issues-closed-raw/Ankuraxz/Tagonizer" alt = "Closed Issues">
    <img src ="https://img.shields.io/github/issues-pr-raw/Ankuraxz/Tagonizer" alt = "Open Pull Requests">
    <img src ="https://img.shields.io/github/issues-pr-closed/Ankuraxz/Tagonizer" alt = "Closed Pull Requests">
  </a>
 </p>
    

## Problem Statement 
Customers write product reviews on ecommerce websites like Amazon. Amazon processes the reviews to generate commonly occurring tags. But, there exist multiple tags referring to the same thing. The Auto-generated Tags from customer Reviews are pointless and repeating like battery, battery life, battery performance etc. Reviews are not well classified as positive or negative, and same goes with tags/comments

## Solution 💡 

+ Comment Analyzer: Using Natural Language Processing to analyze Comments
+ Tag Predictor: Predict Useful Tags Based on Comments and Classify them as Positive and Negative
+ Sentiment Analysis: Using Deep Learning to Analyze the Sentiments and Mine opinions from reviews
+ Chrome Extension: Products Chrome Extension that fetches reviews, whenever you visit Amazon and provides you with Tags in an interactive UI

## Technical Details 🧰 
+ Python 🐍 
+ FastAPI 
+ Uvicorn 🌏 
+ Heroku 
+ Microsoft Azure ☁️
+ HTML, CSS & JS 

## Running Tagonizer Locally 

#### Backend 

1. First Clone the repository. 
```bash
$ git clone https://github.com/Ankuraxz/Tagonizer.git
```
2. Navigate into Cloned Repository. 
```bash 
$ cd Tagonizer
```
3. Create Virtual Environment and Using it. 
```bash 
$ python -m venv venv/
$ $ source venv/bin/activate
```
4. Install Requirements
```bash 
$ pip install -r requirements.txt
```
5. [Create an Azure resource](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-call-api) for Text Analytics. Afterwards, [get the key](https://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-call-api) generated for you to authenticate your requests.
6. Set Environment Variable `KEY`, `ENDPOINT`, `LOCATION` with secret token/key, endpoint/base-url and location of resource respectively. 
7. Run the following command to start backend at `http://localhost:8000/`
```bash
$ uvicorn API.main:app --reload --host=0.0.0.0 --port=8000
```
8. Open `http://localhost:8000/` in browser of your choice. You will be greeted with Swagger UI and further details are present there. 

## LICENSE 

This work is published under MIT License. All right reserved. 

Published from India
