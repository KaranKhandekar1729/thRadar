import requests
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("IP2LOCATION_API_KEY")

def get_ip_location(ip):
    """Fetch location data (lat/lng) for an IP from ip2location.io"""
    url = f"https://api.ip2location.io/?key={API_KEY}&ip={ip}"
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        data = r.json()
        return {
            "ip": ip,
            "latitude": data.get("latitude"),
            "longitude": data.get("longitude")
        }
    except requests.RequestException as e:
        return {"ip": ip, "error": str(e)}

def enrich_ips_with_geolocation(input_file, output_file):
    # Load existing IP data
    with open(input_file, "r") as f:
        ip_data = json.load(f)

    ips = [entry["ipAddress"] if "ipAddress" in entry else entry["ip"] for entry in ip_data]

    results = []
    with ThreadPoolExecutor(max_workers=5) as executor:
        future_to_ip = {executor.submit(get_ip_location, ip): ip for ip in ips}
        for future in as_completed(future_to_ip):
            loc_result = future.result()
            ip = loc_result.get("ip")

            # find original entry
            original = next((x for x in ip_data if x.get("ipAddress") == ip or x.get("ip") == ip), {})
            merged = {**original, **loc_result}
            results.append(merged)

    # Save enriched data
    with open(output_file, "w") as f:
        json.dump(results, f, indent=2)

    print(f"Saved {len(results)} IPs with geolocations  to {output_file}")


if __name__ == "__main__":
    input_path = os.path.join(os.path.dirname(__file__), "../../public/blacklist.json")
    output_path = os.path.join(os.path.dirname(__file__), "../../../client/public/ips_with_geolocation.json")
    enrich_ips_with_geolocation(input_path, output_path)
