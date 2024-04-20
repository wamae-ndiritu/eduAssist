from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, username, user_type, password=None, **extra_fields):
        if not username:
            raise ValueError('The username must be set')
        if not user_type:
            raise ValueError('The user type must be set')
        user = self.model(username=username,
                          user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, user_type, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, user_type, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    USER_TYPE_CHOICES = (
        ('beneficiary', 'Beneficiary'),
        ('donor', 'Donor'),
        ('admin', 'Admin'),
    )
    username = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=15)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['user_type']

    def __str__(self):
        return self.username


class Beneficiary(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE)  # Relationship
            # Personal Information
    location = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    personal_info_updated = models.BooleanField(default=False)

    # Institution Information
    institution_name = models.CharField(max_length=200)
    education_level = models.CharField(max_length=100)
    course_name = models.CharField(max_length=200)
    year_joined = models.PositiveIntegerField(blank=True, null=True)
    expected_graduation = models.DateField(blank=True, null=True)
    institution_details_updated = models.BooleanField(default=False)

    # Document URLs
    birth_certificate_url = models.URLField(blank=True, null=True)
    national_id_url = models.URLField(blank=True, null=True)
    kcpe_certificate_url = models.URLField(blank=True, null=True)
    kcse_certificate_url = models.URLField(blank=True, null=True)
    documents_updated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.institution_name} - {self.course_name} - {self.year_joined}"


class Donor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)


