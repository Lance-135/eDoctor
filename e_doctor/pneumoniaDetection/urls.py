from django.urls import path
from .views import views, authenticate


urlpatterns = [
    path("predict/", views.Predict.as_view()), 
    path("", views.loadModel),
    path("signup/", authenticate.signUpView)
]
