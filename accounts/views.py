from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout
# Create your views here.


def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect("/")
    context = {
        "title": "Login",
        "form": form,
        "btn_label": "Login"
    }
    return render(request, "accounts/auth.html", context=context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        return redirect("/login")
    context = {
        "title": "Register",
        "form": form,
        "btn_label": "Register"
    }
    return render(request, "accounts/auth.html", context=context)


def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
        "title": "Logout",
        "form": None,
        "btn_label": "Logout"
    }
    return render(request, "accounts/auth.html", context=context)
