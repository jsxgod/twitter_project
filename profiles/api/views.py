from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.contrib.auth import get_user_model

from ..models import Profile


User = get_user_model()


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    current_user = request.user
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

    return Response({"count": follow_profile.followers.all().count()}, status=200)
