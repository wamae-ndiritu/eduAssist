from rest_framework import serializers
from .models import Beneficiary, CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True)  # Set password as write-only

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'full_name', 'email', 'contact',
                  'user_type', 'is_staff', 'is_active', 'password']
        read_only_fields = ['id']  # 'id' should not be included when writing

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            **validated_data)
        return user


class BeneficiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiary
        fields = ['user']

class BeneficiaryReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiary
        fields = ['user']
