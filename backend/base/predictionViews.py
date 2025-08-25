import keras
from rest_framework.views import APIView
from PIL import Image
import numpy as np
import tensorflow as tf
from rest_framework.decorators import api_view
from rest_framework import response, status


#load model 
filePath = "./base/model40.h5"
# model = keras.models.load_model(filePath, compile = False)
try:
    model = keras.models.load_model(filePath, compile= False)
except Exception as e: 
    model = None
    print(e)

@api_view(['POST'])
def predict(request): 
    if request.FILES.get('image'): 
        image = request.FILES['image']
        result = predictImage(image)[0][0] 
        probability = result * 100
        return response.Response({"prediction" : f"Probability of Pneumonia: {probability: 0.2f}%"}, status=status.HTTP_200_OK )
    else:
        return response.Response({'error': "invallid request"}, status = status.HTTP_400_BAD_REQUEST)

def predictImage(image):
    global model
    if image:
        # L to make img grayscale as the model was trained on grayscale chest xray images 
        img = Image.open(image).convert("L") 
        width, height = img.size
        left = 0.1 * width
        right = 0.9 * width 
        top = 0 
        bottom = height
        img = img.crop((left, top, right, bottom))
        img = img.resize((256,256)) # resizing the image to match the input size of model40
        img_array = np.array(img)/255 # normalizing values as the model was trained on normalized data 
        img_array = img_array.reshape((256,256,1)) 
        img_array = np.expand_dims(img_array, axis= 0)
        print(img_array.shape)
        result = model.predict(img_array)
        # result = [[20]]
        print(result)
        return result