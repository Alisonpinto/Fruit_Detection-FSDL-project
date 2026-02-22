import os
import numpy as np
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from PIL import Image
import tensorflow as tf

predict_bp = Blueprint('predict', __name__)

# Allowed extensions for image upload
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

# Mapping of class indices to readable fruit names
CLASS_NAMES = [
    "Mango_Alphonso_Good",
    "Mango_Alphonso_Raw",
    "Banana_Yellow_Ready",
    "Banana_Green_NotReady"
]

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_model():
    """Returns the globally loaded model from the app context."""
    return getattr(current_app, 'model', None)

def parse_prediction(label):
    """
    Parses a label like 'Mango_Alphonso_Good' into structured data.
    """
    parts = label.split('_')
    fruit = parts[0] if len(parts) > 0 else "Unknown"
    breed = parts[1] if len(parts) > 1 else "Unknown"
    status = parts[2] if len(parts) > 2 else ""

    # Logic based on status keywords
    ready_to_eat = status in ["Good", "Ready"]
    market_ready = status == "Good" 
    
    return {
        "fruit": fruit,
        "breed": breed,
        "ready_to_eat": ready_to_eat,
        "market_ready": market_ready
    }

@predict_bp.route('/predict', methods=['POST'])
def predict():
    # 1. Validate file part exists
    if 'file' not in request.files:
        return jsonify({
            "error": "No file uploaded",
            "message": "The request must contain a 'file' part using multipart/form-data."
        }), 400
    
    file = request.files['file']
    
    # 2. Validate filename is not empty
    if file.filename == '':
        return jsonify({
            "error": "No file selected",
            "message": "Please select an image file to upload."
        }), 400

    # 3. Validate file type
    if not allowed_file(file.filename):
        return jsonify({
            "error": "Invalid file type",
            "message": f"Allowed types are: {', '.join(ALLOWED_EXTENSIONS)}"
        }), 400

    # 4. Check if model is loaded
    model = get_model()
    if model is None:
        return jsonify({
            "error": "Model not loaded",
            "message": "The AI model is not currently active on the server. Please ensure fruit_model.h5 is in backend/models/"
        }), 503

    if file:
        try:
            # 5. Open image using Pillow
            try:
                img = Image.open(file.stream)
                img = img.convert('RGB')
            except Exception:
                return jsonify({
                    "error": "Corrupted image",
                    "message": "The uploaded file could not be opened as a valid image."
                }), 400

            # 6. Resize image to (224, 224)
            img = img.resize((224, 224))

            # 7. Preprocess for TensorFlow
            img_array = np.array(img).astype('float32')
            img_array = img_array / 255.0  # Normalize
            img_array = np.expand_dims(img_array, axis=0) # Expand dimensions

            # 8. Run model.predict()
            predictions = model.predict(img_array)

            # 9. Extract highest probability class
            class_index = int(np.argmax(predictions[0]))
            confidence = float(np.max(predictions[0]))

            # 10. Convert class index into readable output
            if class_index < len(CLASS_NAMES):
                label = CLASS_NAMES[class_index]
                result = parse_prediction(label)
            else:
                result = {
                    "fruit": "Unknown",
                    "breed": "Unknown",
                    "ready_to_eat": False,
                    "market_ready": False
                }

            # 11. Return JSON response
            return jsonify({
                "fruit": result["fruit"],
                "breed": result["breed"],
                "ready_to_eat": result["ready_to_eat"],
                "market_ready": result["market_ready"],
                "confidence": round(confidence, 4)
            })

        except Exception as e:
            return jsonify({
                "error": "Internal processing error",
                "message": str(e)
            }), 500

    return jsonify({
        "error": "Invalid request",
        "message": "An unexpected error occurred during the request."
    }), 400
