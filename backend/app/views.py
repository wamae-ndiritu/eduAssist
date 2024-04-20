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
            if not profile.personal_info_updated:
                # Profile info has not been previously updated
                if location is None or city is None or address is None or zip_code is None or date_of_birth is None:
                    return Response({"message": "Please fill all the personal infomartion!"}, status=status.HTTP_404_BAD_REQUEST)
                profile.location = location
                profile.city = city
                profile.address = address
                profile.zip_code = zip_code
                profile.date_of_birth = date_of_birth
                profile.personal_info_updated = True
            else:
                profile.location = location or profile.location
                profile.city = city or profile.city
                profile.address = address or profile.address
                profile.zip_code = zip_code or profile.zip_code
                profile.date_of_birth = date_of_birth or profile.date_of_birth
            profile.save()
        except Beneficiary.DoesNotExist:
            return Response({"message": "Profile not found!"}, status=status.HTTP_404_NOT_FOUND)
        

# institution_name = models.CharField(max_length=200)
# education_level = models.CharField(max_length=100)
# course_name = models.CharField(max_length=200)
# year_joined = models.PositiveIntegerField(blank=True, null=True)
# expected_graduation = models.DateField(blank=True, null=True)
# institution_details_updated = models.BooleanField(default=False)
# 2. Update institution details
# @permission_classes([IsAuthenticated])
