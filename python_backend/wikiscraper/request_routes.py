import requests,json

base_url="http://localhost:5000/api/crypto"

with open("./crypto_data_summarized.json") as f:
    cryptos=json.load(f)
for crypto in cryptos:
    name=crypto["name"]
    summary=crypto["paragraphs"]
    r=requests.get(f"{base_url}/title/{name}")
    if r.status_code==200:
        crypto_id = r.json()["_id"]
        print("Updating notes!")
        requests.put(f"{base_url}/{crypto_id}",json={"name":name,"summary":summary})
    else:
        print("Creating notes!")
        requests.post(base_url,json={"name":name,"summary":summary})
            