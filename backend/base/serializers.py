from rest_framework import serializers
from .models import User, Prediction

# Creating a Serializer for custom user class
class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['email', 'password', 'full_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class PredictionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Prediction
        fields = '__all__'
        read_only_fields = ['user']
        