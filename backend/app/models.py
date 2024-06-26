from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, user_type, password=None, **extra_fields):
        if not username:
            raise ValueError('The username must be set')
        if not email:
            raise ValueError('The username must be set')
        if not user_type:
            raise ValueError('The user type must be set')
        user = self.model(username=username, email=email,
                          user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, user_type, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, user_type, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    USER_TYPE_CHOICES = (
        ('beneficiary', 'Beneficiary'),
        ('donor', 'Donor'),
        ('admin', 'Admin'),
    )
    username = models.CharField(max_length=100, unique=True)
    profile_pic = models.CharField(max_length=255, null=True)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contact = models.CharField(max_length=15)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['user_type', 'email']

    def has_perm(self, perm, obj=None):
        # Handle custom permissions logic here
        return True

    def has_module_perms(self, app_label):
        # Handle custom module permissions logic here
        return True

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
    expected_graduation = models.PositiveIntegerField(blank=True, null=True)
    institution_details_updated = models.BooleanField(default=False)

    # Document URLs
    national_id_url = models.URLField(blank=True, null=True)
    kcpe_certificate_url = models.URLField(blank=True, null=True)
    kcse_certificate_url = models.URLField(blank=True, null=True)
    documents_updated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.institution_name} - {self.course_name} - {self.year_joined}"


class Donor(models.Model):
    statusChoices = [
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('pending', 'Pending')
    ]
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    organization = models.CharField(max_length=150, null=True)
    national_id = models.CharField(max_length=70, null=True)
    status = models.CharField(
        max_length=100, choices=statusChoices, default='pending')


class FinancialAidRequest(models.Model):
    statusChoices = [
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('pending', 'Pending')
    ]
    beneficiary = models.ForeignKey(
        Beneficiary, null=True, on_delete=models.SET_NULL)
    donor = models.ForeignKey(Donor, on_delete=models.SET_NULL, null=True)
    reason_for_aid = models.TextField(null=False)
    is_disabled = models.BooleanField(default=False)
    disability_description = models.TextField(null=True, default=None)
    is_parent_disabled = models.BooleanField(default=False)
    parent_disability_description = models.TextField(null=True, default=None)
    funding_source = models.TextField(null=True, blank=True)
    is_orphan = models.BooleanField(default=False)
    scholarships = models.BooleanField(default=False)
    bursary = models.BooleanField(default=False)
    well_wishers = models.BooleanField(default=False)
    others = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now())
    is_reviewed = models.BooleanField(default=False)
    transcript = models.TextField(null=True, default=None)
    fee_structure = models.TextField(null=True, default=None)
    fee_statement = models.TextField(null=True, default=None)
    proof_of_background = models.TextField(null=True, default=None)
    status = models.CharField(max_length=100, choices=statusChoices, default='pending')


class Notification(models.Model):
    user = models.ForeignKey(
        'CustomUser', on_delete=models.CASCADE, related_name='notifications')
    sender = models.ForeignKey('CustomUser', on_delete=models.CASCADE,
                               null=True, default=None, related_name='sent_notifications')
    title = models.CharField(max_length=255, null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f'Notification for {self.user.username} - {self.message}'
