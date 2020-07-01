from django.urls import path, re_path

from .views import (
        PostDetailAPIView,
        PostListCreateAPIView,
    )


app_name = 'accounts-api'
urlpatterns = [
    path('', PostListCreateAPIView.as_view(), name='list-create'),
    re_path(r'^(?P<slug>[\w-]+)/$', PostDetailAPIView.as_view(), name='detail'),
]
