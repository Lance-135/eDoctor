import os
import numpy as np
import tensorflow as tf
from PIL import Image

#load model 
filePath = "./pneumoniaDetection/model40.h5"
_model = None
def get_model():
    global _model
    if _model is None:
        _model = tf.keras.models.load_model(filePath)
    return _model

def predictImage(image):
    get_model()
    if image:
        # L to make img grayscale as the model was trained on grayscale chest xray images 
        img = Image.open(image).convert("L") 
        img = img.resize((256,256)) # resizing the image to match the input size of model40
        img_array = np.array(img)/255 # normalizing values as the model was trained on normalized data 
        img_array = img_array.reshape((256,256,1)) 
        img_array = np.expand_dims(img_array, axis= 0)
        print(img_array.shape)
        result = _model.predict(img_array)
        print(result)
        return result