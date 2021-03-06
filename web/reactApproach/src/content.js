import cheerio from "cheerio";

async function getData(){
  const response = await fetch(
    `https://www.amazon.in/Starry-Storage-Additional-Exchange-Offers/dp/B08LRFGM3T/ref=sr_1_1_sspa?dchild=1&keywords=phones&qid=1615048393&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzQlFETkZVSTZBUEJBJmVuY3J5cHRlZElkPUEwMTEyOTM5MkIxTExSNjJXM1dSRSZlbmNyeXB0ZWRBZElkPUEwNjg2ODE2MVdFQlFHMFhHUjk4VSZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU=`
  );
  const text = await response.text();
  const $ = cheerio.load(text);
  const data =  $("#customer_review-R2BKDINI6JO085 > div.a-row.a-spacing-small.review-data > span > div > div.a-expander-content.reviewText.review-text-content.a-expander-partial-collapse-content > span").text().trim();
  console.log(data);
}

getData();