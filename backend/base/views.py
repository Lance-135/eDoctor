from email import message
from email.policy import strict
from rest_framework import viewsets, permissions, views, response
from .models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# Separate view for register
class RegisterView(views.APIView):
    
    # for registration
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('full_name')

        # user = User.objects.create_user(email = email, password = password, full_name = full_name)

        # if user: 
        #     return user # actuall i want to set jwt token in the browser
        # else:
        #     return None # return an error
        try: 
            user = User.objects.create_user(request.data)

            # generation tokens
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)

            res = response.Response({
                "message": "Registration successful"
            })
            res.set_cookie(
                key= 'refresh_token',
                value= refresh_token,
                httponly= True, 
                secure = True, 
                samesite= "Strict",
                max_age= 7 * 24 * 3600

            )
            res.set_cookie(
                key= 'access_token',
                value= access_token,
                httponly= True, 
                secure = True, 
                samesite= "Strict",
                max_age= 3600

            )
        except: 
            res = response.Response({
                'error_message': 'Registration failed'
            })