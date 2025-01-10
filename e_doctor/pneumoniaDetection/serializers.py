from rest_framework import serializers
from models import Prediction


class PredictionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Prediction
        fileds = ['id', 'owner', 'image', 'result']