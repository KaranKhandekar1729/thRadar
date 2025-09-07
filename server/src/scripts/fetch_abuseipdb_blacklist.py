import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("FETCH_IP_KEY").strip()

HEADERS = {"Accept": "application/json", "Key": API_KEY}

# Get new IPs from /blacklist
url = "https://api.abuseipdb.com/api/v2/blacklist"
params = {"maxAgeInDays": 1}  # last 1 day

output_path = os.path.join(os.path.dirname(__file__), "../../public/blacklist.json")

try:
    response = requests.get(url, headers=HEADERS, params=params, timeout=10)
    blacklist_data = response.json().get("data", [])

    with open(output_path, "w") as f:
        json.dump(blacklist_data, f, indent=2)

        print(f"Saved {len(blacklist_data)} IPs to blacklist.json")
    
except requests.RequestException as e:
    print("Failed to fetch blacklist:", e)
