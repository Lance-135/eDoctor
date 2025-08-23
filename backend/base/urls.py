from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'user', viewset= views.UserViewset, basename='user') # will update it after creating the viewset
router.register(r'prediction', viewset=views.PredictionViewset)


urlpatterns = [
    path('register/', views.RegisterView.as_view(), name = 'register'),
    path('', include(router.urls)),
    path('auth/refresh/', TokenRefreshView.as_view(), name='refresh_access_token'),
    path('auth/login/', TokenObtainPairView.as_view(), name = 'Obtain_token_pairs'), 
    path('auth/logout/', views.LogoutView.as_view(), name = 'logout')
]
