import os
from django.http import JsonResponse
import numpy as np
import tensorflow as tf
from PIL import Image



def predictImage(image):
    if image:
        img = Image.open(image).convert("L")
        img = img.resize((256,256))
        img_array = np.array(img)/255
        img_array = img_array.reshape((256,256,1))
        img_array = np.expand_dims(img_array, axis= 0)
        print(img_array.shape)
        result = model.predict(img_array)
        print(result)
        return result