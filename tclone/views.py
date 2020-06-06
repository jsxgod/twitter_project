from django.shortcuts import render


def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request, "pages/home.html", context={"username": username}, status=200)


def local_tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")


def local_tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/tweet.html", context={"tweet_id": tweet_id})


def local_tweets_profile_view(request, username, *args, **kwargs):
    return render(request, "tweets/profile.html", context={"profile_username": username})
