from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # so it basically verifies the user and then creates a token for him
    path('token/refresh', TokenRefreshView.as_view(), name = 'token_refresh')
]