from django.urls import path
from .views import create_user, login, delete_user

urlpatterns = [
    path('users/create/', create_user),
    path('users/login/', login),
    path('users/<int:user_id>/delete/', delete_user),
]