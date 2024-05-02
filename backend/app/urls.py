from django.urls import path
from .views import create_user, login, delete_user, update_personal_info, update_documents, update_institution_info, get_profile_info, fetch_pdf, update_profile_picture

urlpatterns = [
    path('users/create/', create_user),
    path('users/login/', login),
    path('users/<int:profile_id>/update/personal-info/', update_personal_info),
    path('users/<int:profile_id>/update/institution-info/', update_institution_info),
    path('users/<int:profile_id>/update/documents/', update_documents),
    path('users/<int:profile_id>/update/picture/', update_profile_picture),
    path('users/<int:profile_id>/', get_profile_info),
    path('fetch-pdf/', fetch_pdf),
]