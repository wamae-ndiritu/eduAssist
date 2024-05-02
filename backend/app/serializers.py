from rest_framework import serializers
from .models import Beneficiary, CustomUser, Donor, FinancialAidRequest


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True)  # Set password as write-only

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'full_name', 'email', 'contact',
                  'user_type', 'is_staff', 'is_active', 'password', 'profile_pic']
        read_only_fields = ['id', 'profile_pic']  # 'id' should not be included when writing

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
        fields = '__all__'

class DonorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = '__all__'


class FinancialAidRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialAidRequest
        fields = ['reason_for_aid', 'is_disabled', 'disability_description',
                  'is_parent_disabled', 'parent_disability_description', 'funding_source', 'created_at', 'beneficiary']
