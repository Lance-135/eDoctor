from enum import unique
from django.db import models
from django.forms import CharField, DateTimeField, EmailField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

# Create your models here.

class Prediction(models.Model):
    user = models.ForeignKey("User", verbose_name=("Author"), on_delete=models.CASCADE)
    image = CharField(max_length=50)
    result = CharField(max_length= 10)
    confidence = models.DecimalField(max_digits= 5, decimal_places= 2, default= 0)
    upload_time = DateTimeField()

# Creating a custom user class
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=40, null=False)
    is_saff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']
    
    def __str__(self):
        return self.email
    
    
