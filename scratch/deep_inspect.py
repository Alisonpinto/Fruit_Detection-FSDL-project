import tensorflow as tf
import os

model_path = r'c:\Users\Dell\Desktop\Fruit_Detection-FSDL-project\backend\models\fruit_detection_model.h5'
if os.path.exists(model_path):
    try:
        model = tf.keras.models.load_model(model_path)
        print("Model loaded.")
        
        # Check for any custom attributes
        if hasattr(model, 'class_names'):
            print(f"Class names found in model: {model.class_names}")
        
        # Check for training config
        config = model.get_config()
        # print(config) # This might be too long
        
        # Sometimes class names are in the layer names or metadata
        # but usually not in .h5 unless explicitly added.
        
        # Let's try to see if there's any info in the output layer
        output_layer = model.layers[-1]
        print(f"Output layer: {output_layer.name}, units: {output_layer.units if hasattr(output_layer, 'units') else 'N/A'}")
        
    except Exception as e:
        print(f"Error: {e}")
else:
    print("Model file not found")
