import os
import tensorflow as tf
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def load_model(app):
    """Load the TensorFlow model once at startup."""
    model_path = os.path.join(os.getcwd(), 'models', 'fruit_model.h5')
    if os.path.exists(model_path):
        try:
            app.model = tf.keras.models.load_model(model_path)
            print(f"Model loaded successfully from {model_path}")
        except Exception as e:
            print(f"Error loading model: {e}")
            app.model = None
    else:
        print(f"Model file not found at {model_path}. Please place fruit_model.h5 in backend/models/")
        app.model = None

def create_app():
    # 1. Initialize Flask app
    app = Flask(__name__)
    
    # 2. Enable CORS
    CORS(app)

    # 3. Load model once at startup
    load_model(app)

    # 4. Register predict route
    from routes.predict import predict_bp
    app.register_blueprint(predict_bp)

    @app.route('/')
    def index():
        return {"status": "GLENN API is running", "model_loaded": app.model is not None}

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
