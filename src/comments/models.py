from django.conf import settings
from djongo import models
from django.db.models.signals import pre_save


from .utils import unique_slug_generator
# Create your models here.

class Comentario(models.Model):
    user            = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nombre          = models.CharField(max_length=120)
    comentario      = models.CharField(max_length=120)
    id_usuario      = models.IntegerField()
    slug            = models.SlugField(blank=True, null=True)

    def __str__(self):
        return self.nombre


def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)

pre_save.connect(pre_save_post_receiver, sender=Comentario)

