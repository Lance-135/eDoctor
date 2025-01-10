from pneumoniaDetection.serializers import PredictionSerializer
from models import Prediction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import response, status


class AddPredictionView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        try:
            user = request.user
            image = request.FILES['image']
            prediction = Prediction.objects.create(owner = user, image = image, result = "nothing")
            print(prediction)
            return response.Response({"message": "prediction added"}, status = status.HTTP_201_CREATED)
        except Exception as e:
            return response.Response({"error": str(e)} , status=status.HTTP_409_CONFLICT)
    
    def get(self, request): 
        try: 
            user = request.user
            predictions = user.predictions.all()
            if  not predictions.exists():
                return response.Response({"message": "No predictions found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = PredictionSerializer(predictions, many = True)
            return response.Response({"predictions": serializer.data}, status = status.HTTP_302_FOUND)
        
        except Exception as e:
            return response.Response({"error": str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)