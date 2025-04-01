from rest_framework import serializers
from pneumoniaDetection.models import Prediction
class PredictionSerializer(serializers.ModelSerializer):
    class Meta: 
        # model = Prediction
        fileds = ['id', 'owner', 'image', 'result']