# Generated by Django 2.2.13 on 2020-06-30 09:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=120)),
                ('password', models.CharField(max_length=120)),
                ('correo', models.CharField(max_length=120)),
                ('Almdisp', models.IntegerField()),
                ('id_H_descargas', models.IntegerField()),
                ('id_publicacion', models.IntegerField()),
                ('id_PDR', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
