from django.contrib import admin
from django.urls import path, include

from .views import profile_detail_view, profile_update_view

urlpatterns = [
    path('<str:username>', profile_detail_view),
    path('<str:username>/edit', profile_update_view)
]
