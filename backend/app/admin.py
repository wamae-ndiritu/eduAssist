from django.contrib import admin
from .models import CustomUser, Beneficiary, Donor, Notification

admin.site.register(CustomUser)
admin.site.register(Beneficiary)
admin.site.register(Donor)
admin.site.register(Notification)
