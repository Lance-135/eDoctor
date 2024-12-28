from django.db import models

# Create your models here.
class Prediction(models.Model):
    owner = models.CharField(max_length= 30)
    image = models.CharField()
    result = models.CharField(max_length = 30)