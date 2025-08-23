from email import message
from email.policy import strict
from http import HTTPStatus
from rest_framework import viewsets, permissions, views, response, status
from rest_framework.permissions import IsAuthenticated
from .models import User, Prediction
from .serializers import PredictionSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # restricting the queryset 
    def get_queryset(self):
        return User.objects.filter(id  = self.request.user.id)

class PredictionViewset(viewsets.ModelViewSet):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
    permission_classes = [permissions.IsAuthenticated]

# Separate view for register
class RegisterView(views.APIView):
    
    # for registration
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        full_name = request.data.get('full_name')
        print(request.data)

        try: 
            user = User.objects.create_user(email = email, password = password, full_name = full_name)

            # generation tokens
            refresh_token = RefreshToken.for_user(user)
            access_token = str(refresh_token.access_token)

            print("jwt generated")

            res = response.Response({
                "message": "Registration successful",
                "full_name": user.full_name,
                "email": user.email, 
                "refresh_token": str(refresh_token),
                "access_token" : access_token
            }, status = status.HTTP_200_OK )
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
            )
        except: 
            res = response.Response({
                'error_message': 'Registration failed'
            }, status= status.HTTP_400_BAD_REQUEST)
        return res
    
# for login let's try using tokenobtainpairview 

# Logout view 
class LogoutView(views.APIView): 
    permission_classes = [IsAuthenticated]
    def post(self, request): 
        refresh_token_string = request.data.get("refresh_token")
        if not refresh_token_string: 
            return response.Response({"error_message": "Token required for blacklist"}, status=status.HTTP_400_BAD_REQUEST)
        try: 
            refresh_token = RefreshToken(refresh_token_string)
            refresh_token.blacklist()
            res = response.Response({
                'message': "logout successful"
            }, status = status.HTTP_200_OK)
            return res
        except Exception as e : 
            res = response.Response({
                "error_message": f"failed to blacklist token => {e}"
            }, status = status.HTTP_409_CONFLICT)
            return res