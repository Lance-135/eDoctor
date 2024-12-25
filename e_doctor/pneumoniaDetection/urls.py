from django.urls import path
from .views import views


urlpatterns = [
    path("predict/", views.Predict.as_view()), 
    path("", views.loadModel)
]
