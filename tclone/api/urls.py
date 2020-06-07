from django.urls import path

import tclone.api.views as api_views

urlpatterns = [
    path('', api_views.tweet_list_view),
    path('feed', api_views.tweet_feed_view),
    path('action', api_views.tweet_action_view),
    path('create', api_views.tweet_create_view),
    path('<int:tweet_id>', api_views.tweet_detail_view),
    path('<int:tweet_id>/delete', api_views.tweet_delete_view)
]