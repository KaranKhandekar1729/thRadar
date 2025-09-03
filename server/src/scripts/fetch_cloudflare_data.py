import os
import json
from cloudflare import Cloudflare

# load env for api token
# added to github actions for cron job
API_TOKEN = os.getenv("CLOUDFLARE_API_TOKEN")
if not API_TOKEN:
    raise ValueError("CLOUDFLARE_API_TOKEN not set in environment variables!")

cf = Cloudflare(api_token=API_TOKEN)

# set output path to be public folder on frontend
output_path = os.path.join(os.path.dirname(__file__), "../../../client/public/attacks.json")

# getting the country codes to coordinates json data
with open("../../public/country_code2coords.json", "r") as f:
    countries = json.load(f)

# fetching api and updating the data with the coordinates for country code 
# so we can map those on three globe
def fetch_radar():
    print("Fetching layer 7 attack data from cloudflare...")

    # clf data
    attackData = cf.radar.attacks.layer7.top.attacks(
        date_range= ["30d"],
        limit=100
    )

    # print(attackData)

    dataWithCoords = []
    for data in attackData.top_0:
        origin = countries.get(data.origin_country_alpha2, {"lat": 0, "lng": 0})
        target = countries.get(data.target_country_alpha2, {"lat": 0, "lng": 0})
        dataWithCoords.append({
            "originCountryAlpha2": data.origin_country_alpha2,
            "originCountryName": data.origin_country_name,
            "targetCountryAlpha2": data.target_country_alpha2,
            "targetCountryName": data.target_country_name,
            "value": data.value,
            "rank": data.rank,
            "originLat": origin["lat"],
            "originLng": origin["lng"],
            "targetLat": target["lat"],
            "targetLng": target["lng"],
        })


    # updating the clf data with coords 
    with open(output_path, "w") as f:
        json.dump(dataWithCoords, f, indent=2)

    print("attacks.json updated with geo coordinates")

if __name__ == "__main__":
    fetch_radar()
