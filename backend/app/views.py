from datetime import timedelta
from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Beneficiary, Donor, FinancialAidRequest, Notification
from .serializers import BeneficiarySerializer, CustomUserSerializer, DonorSerializers, BeneficiaryReadSerializer, FinancialAidRequestSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.http import require_POST

# Proxy server
import requests
from django.http import HttpResponse


def fetch_pdf(request):
    pdf_url = request.GET.get('pdfUrl')
    try:
        response = requests.get(pdf_url)
        response.raise_for_status()  # Raise an exception for non-OK responses
        pdf_data = response.content
        return HttpResponse(pdf_data, content_type='application/pdf')
    except requests.RequestException as e:
        return HttpResponse(f'Error fetching PDF: {e}', status=500)


@api_view(['POST'])
def create_user(request):
    if request.method == 'POST':
        user_serializer = CustomUserSerializer(data=request.data)
        if user_serializer.is_valid():
            user = user_serializer.save()

            user_type = request.data.get('user_type')
            if user_type == 'beneficiary':
                beneficiary_data = {
                    'user': user.id,
                }
                beneficiary_serializer = BeneficiarySerializer(data=beneficiary_data)
                if beneficiary_serializer.is_valid():
                    beneficiary_serializer.save()
                else:
                    # Delete the user if beneficiary data is not valid
                    user.delete() 
                    return Response(beneficiary_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # Generate JWT token
                refresh = RefreshToken.for_user(user)
                token = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }

                res_data = {
                    'user': {
                        **user_serializer.data,
                        **beneficiary_serializer.data,
                    },
                    'token': token
                }
                return Response(res_data, status=status.HTTP_201_CREATED)
            elif user_type == 'donor':
                donor_data = {
                    'user': user.id,
                    'organization': request.data.get('organization'),
                    'national_id': request.data.get('national_id')
                }
                donor_serializer = DonorSerializers(
                    data=donor_data)
                if donor_serializer.is_valid():
                    donor_serializer.save()
                else:
                    # Delete the user if donor data is not valid
                    user.delete()
                    return Response(donor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                # Generate JWT token
                refresh = RefreshToken.for_user(user)
                token = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }

                res_data = {
                    'user': {
                        **user_serializer.data,
                        **donor_serializer.data,
                    },
                    'token': token
                }
                return Response(res_data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login
@api_view(['POST'])
def login(request):
    data = request.data
    password = data.get('password', None)
    email = data.get('email', None)
    role = data.get('role')
    if not email:
        return Response({"message": "Email required!"}, status=status.HTTP_400_BAD_REQUEST)
    if not password:
        return Response({"message": "Password required!"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = CustomUser.objects.get(email=email)

        if not user.check_password(password):
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        other_serializer = {}
        if user.user_type == 'beneficiary':
            beneficiary = Beneficiary.objects.get(user_id=user.id)
            other_serializer = BeneficiaryReadSerializer(beneficiary)
        if user.user_type == 'donor':
            donor = Donor.objects.get(user_id=user.id)
            other_serializer = DonorSerializers(donor)

        serializer = CustomUserSerializer(user)

        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        res_data = {}

        if user.user_type != 'donor' and user.is_superuser:
            res_data = {
                'user': {
                    **serializer.data,
                    "user_type": "admin"
                },
                'token': token
            }
        else:
            res_data = {
                'user': {
                    **serializer.data,
                    **other_serializer.data
                },
                'token': token
            }
        return Response(res_data, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"message": "User not found!"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = CustomUser.objects.get(id=user_id)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"message": "User not found!"}, status=status.HTTP_404_NOT_FOUND)

# Update beneficiary profile
# 1. Update personal info
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_personal_info(request, profile_id):
    if request.method == "PATCH":
    # personal_info_updated = models.BooleanField(default=False)
        location = request.data.get('location', None)
        city = request.data.get('city', None)
        address = request.data.get('address', None)
        zip_code = request.data.get('zip_code', None)
        date_of_birth = request.data.get('date_of_birth', None)
        try:
            profile = Beneficiary.objects.get(user__id=profile_id)
            print(profile)
            if not profile.personal_info_updated:
                # Profile info has not been previously updated
                if location is None or city is None or address is None or zip_code is None or date_of_birth is None:
                    return Response({"message": "Please fill all the personal infomartion!"}, status=status.HTTP_400_BAD_REQUEST)
            profile.location = location or profile.location
            profile.city = city or profile.city
            profile.address = address or profile.address
            profile.zip_code = zip_code or profile.zip_code
            profile.date_of_birth = date_of_birth or profile.date_of_birth
            profile.personal_info_updated = True
            profile.save()
            return Response({"personal": True}, status=status.HTTP_200_OK)
        except Beneficiary.DoesNotExist:
            return Response({"message": "Profile not found!"}, status=status.HTTP_404_NOT_FOUND)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)
        

# 2. Update institution details
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_institution_info(request, profile_id):
    if request.method == 'PATCH':
        name = request.data.get('name', None)
        level = request.data.get('level', None)
        course = request.data.get('course', None)
        year_joined = request.data.get('year_joined', None)
        expected_graduation = request.data.get('expected_graduation', None)
        try:
            profile = Beneficiary.objects.get(user__id=profile_id)
            if not profile.institution_details_updated:
                # Insitution details has not been previously updated
                if name is None or level is None or course is None or year_joined is None or expected_graduation is None:
                    return Response({"message": "Please fill all the institution details!"}, status=status.HTTP_400_BAD_REQUEST)
            profile.institution_name = name or profile.institution_name
            profile.education_level = level or profile.education_level
            profile.course_name = course or profile.course_name
            profile.year_joined = year_joined or profile.year_joined
            profile.expected_graduation = expected_graduation or profile.expected_graduation
            profile.institution_details_updated = True
            profile.save()
            return Response({"institution": True}, status=status.HTTP_200_OK)
        except Beneficiary.DoesNotExist:
            return Response({"message": "Profile not found!"}, status=status.HTTP_404_NOT_FOUND)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)

# 3. Update documents
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_documents(request, profile_id):
    if request.method == 'PATCH':
        n_id = request.data.get('national_id', None)
        kcpe = request.data.get('KCPE_certificate', None)
        kcse = request.data.get('KCSE_certificate', None)
        try:
            profile = Beneficiary.objects.get(user__id=profile_id)
            if not profile.institution_details_updated:
                # Documents has not been previously updated
                if n_id is None or kcpe is None or kcse is None:
                    return Response({"message": "Please upload all documents!"}, status=status.HTTP_400_BAD_REQUEST)
            profile.national_id_url = n_id or profile.national_id_url
            profile.kcpe_certificate_url = kcpe or profile.kcpe_certificate_url
            profile.kcse_certificate_url = kcse or profile.kcse_certificate_url
            profile.documents_updated = True
            profile.save()
            return Response({"documents": True}, status=status.HTTP_200_OK)
        except Beneficiary.DoesNotExist:
            return Response({"message": "Profile not found!"}, status=status.HTTP_404_NOT_FOUND)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)

# 4. Update profile picture
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_profile_picture(request, profile_id):
    if request.method == 'PATCH':
        profile_pic = request.data.get('profile_pic', None)
        try:
            user = CustomUser.objects.get(id=profile_id)
            user.profile_pic = profile_pic or user.profile_pic
            user.save()
            return Response({"profile_pic": True}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"message": "Profile not found!"}, status=status.HTTP_404_NOT_FOUND)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)

# Get profile info
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile_info(request, profile_id):
    if request.method == 'GET':
        try:
            user = CustomUser.objects.get(id=profile_id)
            user_serializer = CustomUserSerializer(user)
            beneficiary = Beneficiary.objects.get(user_id=user.id)
            beneficiary_serializer = BeneficiaryReadSerializer(beneficiary)
            user_info = {
                **user_serializer.data,
                **beneficiary_serializer.data
            }
            return Response(user_info, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"message": "User not found!"}, status=status.HTTP_404_NOT_FOUND)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)



# Create Financial aid request
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_financial_request(request):
    if request.method == 'POST':
        user = request.user
        beneficiary = Beneficiary.objects.get(user__id=user.id)
        serializer = FinancialAidRequestSerializer(data={**request.data, "beneficiary": beneficiary.id})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Request created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_financial_requests(request):
    """
    Get Financial requests filtered by 2 months since created.
    """
    if request.method == 'GET':

        # Calculate the date 2 months ago
        two_months_ago = timezone.now() - timedelta(days=60)

        # Filter the FinancialAidRequest objects created up to 2 months ago
        financial_requests = FinancialAidRequest.objects.all().order_by('-created_at')
        requests_info = [{"id": f_request.id, "profile_pic": f_request.beneficiary.user.profile_pic, "reason_for_aid": f_request.reason_for_aid, "created_at": f_request.created_at, "full_name": f_request.beneficiary.user.full_name, "institution_name": f_request.beneficiary.institution_name } for f_request in financial_requests]
        return Response(requests_info, status=status.HTTP_200_OK)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_financial_request(request, request_id):
    """
    Get Financial request by ID
    """
    try:
        financial_request = FinancialAidRequest.objects.get(id=request_id)
        beneficary = Beneficiary.objects.get(id=financial_request.beneficiary_id)
        user = CustomUser.objects.get(id=beneficary.user_id)
        f_id = financial_request.id
        f_serializer = FinancialAidRequestSerializer(financial_request)
        b_serializer = BeneficiaryReadSerializer(beneficary)
        u_serializer = CustomUserSerializer(user)

        request_info = {
            **b_serializer.data,
            **u_serializer.data,
            **f_serializer.data,
            "id": f_id
        }

        return Response(request_info, status=status.HTTP_200_OK)
    except FinancialAidRequest.DoesNotExist:
        return Response({"message": "Not Found!"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_beneficiary_requests(request, beneficiary_id):
    """
    Get beneficiary requests
    """
    if request.method == 'GET':
        beneficiary_requests = FinancialAidRequest.objects.filter(beneficiary_id=beneficiary_id)
        serializer = FinancialAidRequestSerializer(
            beneficiary_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"message": "Invalid request method!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_financial_aid_request_status(request, request_id):
    try:
        financial_aid_request = get_object_or_404(
            FinancialAidRequest, pk=request_id)
        action = request.POST.get('action')

        if action not in ['approve', 'reject']:
            return JsonResponse({'message': 'Invalid action'}, status=400)

        if action == 'approve':
            financial_aid_request.status = 'approved'
            message = 'Your financial aid request has been approved.'
        elif action == 'reject':
            reject_message = request.POST.get('message', None)
            financial_aid_request.status = 'rejected'
            message = f"Your financial aid request has been rejected. {reject_message}"

        financial_aid_request.save()
        
        # Get the associated user (assuming the Beneficiary model has a user field)
        user = financial_aid_request.beneficiary.user

        # Create a notification
        Notification.objects.create(user=user, message=message)

        # Send an email notification
        send_mail(
            'Financial Aid Request Update',
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return JsonResponse({'status': 'success', 'message': message})

    except FinancialAidRequest.DoesNotExist:
        return JsonResponse({'message': 'FinancialAidRequest not found'}, status=404)
    except Exception as e:
        return JsonResponse({'message': str(e)}, status=500)
