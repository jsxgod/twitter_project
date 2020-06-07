"""twitter_clone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

import accounts.views as acc_views
import tclone.views as views

urlpatterns = [
    path('', views.home_view),
    path('admin/', admin.site.urls),
    path('global', views.local_tweets_list_view),
    path('login', acc_views.login_view),
    path('register', acc_views.register_view),
    path('logout', acc_views.logout_view),
    path('<int:tweet_id>', views.local_tweets_detail_view),
    path('profile/', include('profiles.urls')),
    path('api/tweets/', include('tclone.api.urls')),
    path('api/profile/', include('profiles.api.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)