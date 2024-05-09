# Generated by Django 5.0.4 on 2024-05-02 12:32

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_alter_application_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='national_id',
            field=models.CharField(max_length=70, null=True),
        ),
        migrations.AddField(
            model_name='donor',
            name='organization',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.CreateModel(
            name='FinancialAidRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason_for_aid', models.CharField(max_length=255)),
                ('is_disabled', models.BooleanField(default=False)),
                ('disability_description', models.CharField(default=None, max_length=255, null=True)),
                ('is_parent_disabled', models.BooleanField(default=False)),
                ('parent_disability_description', models.CharField(default=None, max_length=255, null=True)),
                ('funding_source', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(default=datetime.datetime(2024, 5, 2, 12, 32, 20, 579630, tzinfo=datetime.timezone.utc))),
                ('is_reviewed', models.BooleanField(default=False)),
                ('beneficiary', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.beneficiary')),
                ('donor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.donor')),
            ],
        ),
        migrations.DeleteModel(
            name='Application',
        ),
    ]
