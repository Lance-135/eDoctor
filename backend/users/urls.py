from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'user', viewset= views.UserViewset) # will update it after creating the viewset


urlpatterns = [
    path('', include(router.urls))
]
