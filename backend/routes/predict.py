import os
import numpy as np
from flask import Blueprint, request, jsonify, current_app
from werkzeug.utils import secure_filename
from PIL import Image
import tensorflow as tf

predict_bp = Blueprint('predict', __name__)

# Allowed extensions for image upload
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

# Mapping of class indices to readable fruit names (Alphabetical order from ImageDataGenerator)
CLASS_NAMES = ["Banana_Bad", "Banana_Good", "Lime_Bad", "Lime_Good"]

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_model():
    """Returns the globally loaded model from the app context."""
    return getattr(current_app, 'model', None)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    print("\n=== PREDICT ENDPOINT CALLED ===")
    
    # 1. Validate file part exists
    if 'file' not in request.files:
        return jsonify({
            "error": "No file uploaded",
            "message": "The request must contain a 'file' part."
        }), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    # 2. Check model
    model = get_model()
    if model is None:
        return jsonify({"error": "Model not loaded"}), 503

    try:
        # 3. Handle image preprocessing (Ensuring 128x128 for the 25088 match)
        from tensorflow.keras.preprocessing.image import img_to_array
        
        target_size = (128, 128)
        img = Image.open(file.stream).convert('RGB')
        img = img.resize(target_size)
        img_array = img_to_array(img)
        # We removed manual / 255.0 because the model has a built-in rescaling_1 layer (scale=0.00392)
        img_array = np.expand_dims(img_array, axis=0)


        # 4. Run model.predict()
        predictions = model.predict(img_array)

        # 5. Extract results using requested logic
        pred_index = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0])) * 100
        pred_label = CLASS_NAMES[pred_index]

        # 6. Split label into fruit and condition
        fruit, condition = pred_label.split("_")

        # 7. Return JSON response
        return jsonify({
            "fruit": fruit,
            "condition": condition,
            "confidence": round(confidence, 2)
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({
            "error": "Internal processing error",
            "message": str(e)
        }), 500



