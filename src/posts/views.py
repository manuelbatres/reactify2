from rest_framework import generics, permissions
from django.db.models import Q

from datetime import date

from .models import Post
from .permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer



class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Post.objects.all()
    serializer_class    = PostSerializer
    lookup_field        = 'slug'
    permission_classes  = [IsOwnerOrReadOnly]


class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset            = Post.objects.all()
   # queryset            = Post.objects.filter(publish__year=2020)
   # queryset=Post.objects.filter(
   # Q(publish=date(2020, 6, 21))
   # )
    serializer_class    =  PostSerializer
    permission_classes  = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


