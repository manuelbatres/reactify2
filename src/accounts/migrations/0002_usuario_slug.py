# Generated by Django 2.2.13 on 2020-06-30 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]
