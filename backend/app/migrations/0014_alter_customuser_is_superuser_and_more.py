# Generated by Django 5.0.4 on 2024-05-24 11:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_financialaidrequest_created_at_notification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='financialaidrequest',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 24, 11, 13, 49, 37209, tzinfo=datetime.timezone.utc)),
        ),
    ]