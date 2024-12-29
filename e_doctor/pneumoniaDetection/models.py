from tkinter import CASCADE
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Prediction(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name= "predictions")
    image = models.CharField() # dunno if this should be here but for now why not 
    result = models.CharField(max_length = 30)