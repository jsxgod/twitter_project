from django.shortcuts import render, redirect
from django.http import Http404

from .models import Profile
from .forms import ProfileForm


def profile_detail_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    obj = qs.first()
    context = {
        "username": username,
        "profile": obj
    }
    return render(request, "profiles/profile.html", context=context)


def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        return redirect("/login?next=/profile/update")
    user = request.user
    user_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email
    }
    profile = user.profile
    form = ProfileForm(request.POST or None, instance=profile, initial=user_data)
    if form.is_valid():
        profile_obj = form.save(commit=False)
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')

        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.save()
        profile_obj.save()

    context = {
        "title": "Update Profile",
        "form": form,
        "btn_label": "Update Profile",
    }
    return render(request, "profiles/form.html", context)
