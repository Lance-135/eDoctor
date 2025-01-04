from email import message
from urllib import response
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt import views


@api_view(["POST"])
def signUpView(request):
    if request.method == 'POST':
        user_name = request.data['user_name']
        email = request.data['email']
        password = request.data['password']

        if User.objects.filter(email = email).exists():
            return Response({"error": "email or username already in use"}, status = status.HTTP_403_FORBIDDEN)

        try:
            user = User.objects.create_user(username=user_name, email=email, password= password)
            user.save()
            refresh = RefreshToken.for_user(user)
            response = Response({
                "user_name": user.username,
                "email": user.email,
                "message": "Sign up successful",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh)
            }, status= status.HTTP_201_CREATED)
            response.set_cookie(
                key= "jwt_token",
                value= str(refresh),
                max_age=7200,
                httponly= True, 
                path= '/', 
                secure= False, 
                samesite= "lax"
            )
            return response
        except Exception as e: 
            return Response({"error": str(e)},status= status.HTTP_500_INTERNAL_SERVER_ERROR)

# view to handle login
@api_view(["POST"])
def loginView(request):
    if request.method == "POST":
        try:
            user_name= request.data["user_name"]
            print(user_name)
            password = request.data["password"]
            print(user_name, password)
            user = authenticate(request, username = user_name, password = password)
            if not user: 
                return Response({"message": "Login failed"}, status= status.HTTP_404_NOT_FOUND)
            else:
                refresh = RefreshToken.for_user(user)
                response = Response({
                    "user_name": user.username,
                    "email": user.email,
                    "jwt_token": str(refresh)
                },status=status.HTTP_202_ACCEPTED)
                response.set_cookie(
                    key="jwt_token",
                    value= str(refresh),
                    max_age=3600,
                    path="/",
                    secure= False,
                    samesite="Lax",
                    httponly=True
                )
                print(response)
                return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# view to logout
@api_view(["POST"])
def logoutView(request):
    if request.method == "POST":
        try:
            response = Response({"message": "logout successful"}, status=status.HTTP_200_OK)
            response.delete_cookie(
                key= "jwt_token",
                path="/",
                )
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)