from django.urls import path

from profiles.api.views import user_follow_view, profile_detail_api_view

urlpatterns = [
    path('<str:username>/', profile_detail_api_view),
    path('<str:username>/follow', profile_detail_api_view)
]