from django.shortcuts import render


def home_view(request, *args, **kwargs):
    return render(request, "pages/feed.html")


def local_tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")


def local_tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/tweet.html", context={"tweet_id": tweet_id})


def local_tweets_profile_view(request, username, *args, **kwargs):
    return render(request, "profiles/profile.html", context={"profile_username": username})
