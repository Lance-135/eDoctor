from django.urls import path
from .views import views, authenticate,database


urlpatterns = [
    path("predict/", views.Predict.as_view()), 
    path("", views.loadModel),
    # path("signup/", authenticate.signUpView),
    # path("signin/", authenticate.signInView),
    path("prediction/", database.AddPredictionView.as_view())
]
