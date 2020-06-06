from django.urls import path

import tclone.views

urlpatterns = [
    path('', tclone.views.tweet_list_view),
    path('action', tclone.views.tweet_action_view),
    path('create', tclone.views.tweet_create_view),
    path('<int:tweet_id>', tclone.views.tweet_detail_view),
    path('<int:tweet_id>/delete', tclone.views.tweet_delete_view)
]