from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response



def signUpView(request):
    if request.method == 'POST':
        user_name = request.POST['user_name']
        email = request.POST['email']
        password = request.POST['password']

        if User.objects.filter(email = email).exists():
            return Response({"error": "email already in use"}, status = 400)

        user = User.objects.create_user(username=user_name, email=email, password= password)
        user.save()

        login(request, user)

        return Response({"message": "Sign up successfully"})
    
def signInView(request):
    if request.method == "POST":
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email = email, password = password)

        if user: 
            login(request, user)
            return Response({"message": "user signed in successfully"})
        else: 
            return Response({"error": "user not signed in"}, status= 400)

