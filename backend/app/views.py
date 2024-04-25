from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Beneficiary
from .serializers import BeneficiarySerializer, CustomUserSerializer, BeneficiaryReadSerializer
from rest_framework.permissions import IsAuthenticated


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
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login
@api_view(['POST'])
def login(request):
    data = request.data
    password = data.get('password', None)
    email = data.get('email', None)
    if not email:
        return Response({"message": "Email required!"}, status=status.HTTP_400_BAD_REQUEST)
    if not password:
        return Response({"message": "Password required!"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = CustomUser.objects.get(email=email)

        if not user.check_password(password):
            return Response({"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        beneficiary_serializer = {}
        if user.user_type == 'beneficiary':
            beneficiary = Beneficiary.objects.get(user_id=user.id)
            beneficiary_serializer = BeneficiaryReadSerializer(beneficiary)

        serializer = CustomUserSerializer(user)

        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        token = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        res_data = {
            'user': {
                **serializer.data,
                **beneficiary_serializer.data,
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
