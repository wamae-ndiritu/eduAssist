from django.urls import path
from .views import create_user, login, delete_user, update_personal_info, update_documents, update_institution_info, get_profile_info, fetch_pdf, update_profile_picture, create_financial_request, get_financial_requests, get_beneficiary_requests, get_financial_request, update_financial_aid_request_status, list_user_notifications
urlpatterns = [
    path('users/create/', create_user),
    path('users/login/', login),
    path('users/<int:profile_id>/update/personal-info/', update_personal_info),
    path('users/<int:profile_id>/update/institution-info/', update_institution_info),
    path('users/<int:profile_id>/update/documents/', update_documents),
    path('users/<int:profile_id>/update/picture/', update_profile_picture),
    path('users/<int:profile_id>/', get_profile_info),
    path('fetch-pdf/', fetch_pdf),
    path('financial-requests/', get_financial_requests),
    path('financial-requests/<int:request_id>/', get_financial_request),
    path('financial-requests/<int:request_id>/update-status/', update_financial_aid_request_status),
    path('financial-requests/create/', create_financial_request),
    path('users/<int:profile_id>/financial-requests/', get_beneficiary_requests),
    path('users/notifications/', list_user_notifications),
]