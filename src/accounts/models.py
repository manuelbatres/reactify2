from django.conf import settings
from djongo import models
from django.db.models.signals import pre_save


from .utils import unique_slug_generator
# Create your models here.

class Usuario(models.Model):
    user            = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    username        = models.CharField(max_length=120)
    password        = models.CharField(max_length=120)
    correo          = models.CharField(max_length=120)
    Almdisp         = models.IntegerField()
    id_H_descargas  = models.IntegerField()
    id_publicacion  = models.IntegerField()
    id_PDR          = models.IntegerField()
    slug            = models.SlugField(blank=True, null=True)

    def __str__(self):
        return self.username


def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

pre_save.connect(pre_save_post_receiver, sender=Usuario)

