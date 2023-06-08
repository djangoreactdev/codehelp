from .models import Profile
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response

# from drf_yasg import openapi
# from drf_yasg.utils import swagger_auto_schema


class GetUserProfileView(APIView):
    def get(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
            username = user.username
            user_profile = Profile.objects.get(pk=pk)
            serializer = UserProfileSerializer(user_profile)
            return Response({"profile": serializer.data, "username": str(username)})
        except:
            return Response({"error": "Something went wrong when retrieving profile"})


class UpdateUserProfileView(APIView):
    # @swagger_auto_schema(
    #     request_body=openapi.Schema(
    #         type=openapi.TYPE_OBJECT,
    #         properties={
    #             "first_name": openapi.Schema(type=openapi.TYPE_STRING),
    #             "last_name": openapi.Schema(type=openapi.TYPE_STRING),
    #             "phone": openapi.Schema(type=openapi.TYPE_STRING),
    #             "city": openapi.Schema(type=openapi.TYPE_STRING),
    #         },
    #     )
    # )
    def put(self, request, pk, format=None):
        try:
            user = User.objects.get(pk=pk)
            username = user.username

            data = self.request.data
            first_name = data["first_name"]
            last_name = data["last_name"]
            phone = data["phone"]
            city = data["city"]

            Profile.objects.filter(user=user).update(first_name=first_name, last_name=last_name, phone=phone, city=city)

            user_profile = Profile.objects.get(user=user)
            user_profileSerializer = UserProfileSerializer(user_profile)

            return Response({"profile": user_profileSerializer.data, "username": str(username)})
        except:
            return Response({"error": "Something went wrong when updating profile"})


class DeleteAccountView(APIView):
    def delete(self, request, pk, format=None):
        try:
            User.objects.filter(id=pk).delete()

            return Response({"success": "User deleted successfully"})
        except:
            return Response({"error": "Something went wrong when trying to delete user"})
