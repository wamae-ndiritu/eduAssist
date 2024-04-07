from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import BeneficiarySerializer, CustomUserSerializer


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

            return Response(user_serializer.data, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = CustomUser.objects.get(id=user_id)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CustomUser.DoesNotExist:
            return Response({"message": "User not found!"}, status=status.HTTP_404_NOT_FOUND)