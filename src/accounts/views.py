from rest_framework import generics, permissions, pagination
from django.db.models import Q

from rest_framework.response import Response
from datetime import date


from .models import Usuario
from .permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer

class PostPageNumberPagination(pagination.PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'
    max_page_size = 20

    def get_paginated_response(self, data):
        author = False
        user = self.request.user
        if user.is_authenticated:
            author = True
        context = {
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'author': author,
            'results': data,
        }
        return Response(context)
    
class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Usuario.objects.all()
    serializer_class    = PostSerializer
    lookup_field        = 'slug'
    permission_classes  = [IsOwnerOrReadOnly]


class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset            = Usuario.objects.all()
   # queryset            = Post.objects.filter(publish__year=2020)
   # queryset=Post.objects.filter(
   # Q(publish=date(2020, 6, 21))
   # )
    serializer_class    =  PostSerializer
    permission_classes  = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class    = PostPageNumberPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

