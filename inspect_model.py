import tensorflow as tf
import os

model_path = r'c:\Users\Dell\Desktop\Fruit_Detection-FSDL-project\backend\models\fruit_detection_model.h5'
if os.path.exists(model_path):
    try:
        model = tf.keras.models.load_model(model_path)
        model.summary()
        # Check for rescaling layer
        for layer in model.layers:
            if 'rescaling' in layer.name.lower():
                print(f"Found rescaling layer: {layer.name}")
                if hasattr(layer, 'scale'):
                    print(f"Scale: {layer.scale}")
                if hasattr(layer, 'offset'):
                    print(f"Offset: {layer.offset}")
    except Exception as e:
        print(f"Error: {e}")
else:
    print("Model file not found")
