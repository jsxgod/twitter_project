from django.urls import path

from profiles.api.views import user_follow_view

urlpatterns = [
    path('<str:username>/follow', user_follow_view)
]