from django.contrib.auth.models import User
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response



def signUpView(self, request):
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
    