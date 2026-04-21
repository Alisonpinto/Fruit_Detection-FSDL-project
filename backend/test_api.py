import requests
import os

# API configuration
URL = "http://localhost:5000/predict"
IMAGE_PATH = "test_image.jpg" # Replace with a path to a real fruit image

def test_prediction():
    if not os.path.exists(IMAGE_PATH):
        print(f"❌ Error: {IMAGE_PATH} not found. Please place a file named 'test_image.jpg' in this folder to test.")
        return

    print(f"🚀 Sending {IMAGE_PATH} to {URL}...")
    
    try:
        with open(IMAGE_PATH, 'rb') as f:
            files = {'file': f}
            response = requests.post(URL, files=files)
        
        if response.status_code == 200:
            print("✅ Success!")
            print("Response:", response.json())
        else:
            print(f"❌ Failed with status code: {response.status_code}")
            print("Response:", response.json())
            
    except Exception as e:
        print(f"❌ Connection Error: {e}")
        print("Make sure your Flask server is running at http://localhost:5000")

if __name__ == "__main__":
    test_prediction()
