from email import message
from urllib import response
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
import jwt
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt import views
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import check_password

@api_view(["POST"])
def signUpView(request):
    if request.method == 'POST':
        user_name = request.data.get("user_name")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(email = email, username = user_name).exists():

            return Response({"error": "email or username already in use"}, status = status.HTTP_403_FORBIDDEN)

        try:
            print(user_name, email, password)
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
            jwt_token = request.data.get("jwt_token")
            print(jwt_token)
            token = RefreshToken(jwt_token)
            token.blacklist()
            response = Response({"message": "logout successful"}, status=status.HTTP_200_OK)
            # response.delete_cookie(
            #     key= "jwt_token",
            #     path="/",
            #     )
            return response
        except Exception as e:
            print(e)
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changePasswordView(request):
    try:
        user = request.user
        data = request.data

        current_password = data.get("current_password")
        new_password = data.get("new_password")

        if not current_password or not new_password:
            return Response({"error": "Both current and new passwords are required."}, status=status.HTTP_400_BAD_REQUEST)

        if not check_password(current_password, user.password):
            return Response({"error": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password)
        user.save()

        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
    except Exception as e: 
        return Response({"error": str(e)}, status = status.HTTP_500_INTERNAL_SERVER_ERROR)