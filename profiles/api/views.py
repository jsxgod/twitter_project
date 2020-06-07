from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth import get_user_model

from ..models import Profile
from ..serializers import PublicProfileSerializer

User = get_user_model()


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    current_user = request.user
    if current_user.username == username:
        return Response({"count": current_user.profile.followers.all().count()}, status=200)
    qs = User.objects.filter(username=username)
    if not qs.exists():
        return Response({}, status=404)
    follow_user = qs.first()
    follow_profile = follow_user.profile

    data = request.data or {}

    action = data.get("action")
    if action == "follow":
        follow_profile.followers.add(current_user)
    elif action == "unfollow":
        follow_profile.followers.remove(current_user)

    data = PublicProfileSerializer(instance=follow_profile, context={"request": request})

    return Response(data.data, status=200)


@api_view(['GET', 'POST'])
def profile_detail_api_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}

    if request.method == "POST":
        current_user = request.user
        action = data.get("action")
        if profile_obj.user != current_user:
            if action == "follow":
                profile_obj.followers.add(current_user)
            elif action == "unfollow":
                profile_obj.followers.remove(current_user)
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    return Response(serializer.data,  status=200)
