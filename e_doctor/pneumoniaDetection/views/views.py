from django.http import  JsonResponse
from pneumoniaDetection import predict
from rest_framework.views import APIView
from rest_framework.response import Response
import tensorflow as tf 


def loadModel(request):
    return Response({"hello": "hello"})

    
class Predict(APIView):
    
    def post(self, request):
        if request.FILES.get('image'): 
            image = request.FILES['image']
            result = predict.predictImage(image)[0][0] 
            probability = result * 100
            return Response({"prediction" : f"Probability of Pneumonia: {probability: 0.2f}%"})
        else:
            return Response({'error': "invallid request"}, status = 400)