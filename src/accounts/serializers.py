from django.contrib.auth import get_user_model, authenticate, login, logout
from django.db.models import Q
from django.urls import reverse
from django.utils import timezone

from rest_framework import serializers

from .models import Usuario

User = get_user_model()


class UserPublicSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True, read_only=True)
    class Meta:
        model = User
        fields = [
            'username',  
            'first_name',
            'last_name',
            ]
    

class PostSerializer(serializers.ModelSerializer):
    url             = serializers.HyperlinkedIdentityField(
                            view_name='accounts-api:detail',
                            lookup_field='slug'
                            )
    user            = UserPublicSerializer(read_only=True)
   
    owner           = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Usuario
        fields = [
            'url',
            'user',
            'slug',
            'username',
            'password',
            'correo',
            'Almdisp',
            'id_H_descargas',
            'id_publicacion',
            'id_PDR', 
            'owner',
        ]
    def get_owner(self, obj):
        print(self.context)
        request = self.context['request']
        if request.user.is_authenticated:
            if obj.user == request.user:
                return True
        return False
