from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib import auth
from rest_framework.response import Response
from user_profile.models import UserProfile
from .serializers import UserSerializer, UserSerializerWithToken, UserProfileSerializer
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import Http404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({"isAuthenticated": "success"})
            else:
                return Response({"isAuthenticated": "error"})
        except:
            return Response({"error": "Something went wrong when checking authentication status"})


# @method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "username": openapi.Schema(type=openapi.TYPE_STRING),
                "password": openapi.Schema(type=openapi.TYPE_STRING),
                "re_password": openapi.Schema(type=openapi.TYPE_STRING),
            },
        )
    )
    def post(self, request, format=None):
        data = self.request.data

        username = data["username"]
        password = data["password"]
        re_password = data["re_password"]

        if password == re_password:
            if User.objects.filter(username=username).exists():
                return Response({"status": "error", "user": {}, "jwt": {}, "massage": "Username already exists"})

            else:
                if len(password) < 6:
                    return Response(
                        {
                            "status": "error",
                            "user": {},
                            "jwt": {},
                            "massage": "Password must be at least 6 characters",
                        }
                    )
                else:
                    user = User.objects.create_user(username=username, password=password)

                    user = User.objects.get(id=user.id)

                    data = UserSerializerWithToken(user).data
                    user_profile = UserProfile.objects.create(user=user, first_name="", last_name="", phone="", city="")
                    user_profileSerializer = UserProfileSerializer(user_profile)

                    data["user_profile"] = user_profileSerializer.data

                    refresh = RefreshToken.for_user(user)
                    jwt = {
                        "refreshToken": str(refresh),
                        "accessToken": str(refresh.access_token),
                    }

                    return Response({"status": "success", "user": data, "jwt": jwt, "massage": "User logged in"})
        else:
            return Response(
                {"status": "error", "user": {}, "jwt": {}, "massage": "password not equal confirm password"}
            )


# @method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "username": openapi.Schema(type=openapi.TYPE_STRING),
                "password": openapi.Schema(type=openapi.TYPE_STRING),
            },
        )
    )
    def post(self, request, format=None):
        data = self.request.data

        username = data["username"]
        password = data["password"]

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)

            data = UserSerializerWithToken(user).data

            refresh = RefreshToken.for_user(user)

            jwt = {
                "refreshToken": str(refresh),
                "accessToken": str(refresh.access_token),
            }

            user_profile = UserProfile.objects.filter(user=user).first()

            if user_profile is not None:
                user_profileSerializer = UserProfileSerializer(user_profile)
                data["user_profile"] = user_profileSerializer.data
            else:
                data["user_profile"] = {"first_name": "", "last_name": "", "phone": "", "city": ""}

            data["ability"] = [{"action": "manage", "subject": "all"}]

            response = {"status": "success", "user": data, "jwt": jwt, "massage": "User logged in"}

            return Response(response)

        else:
            return Response({"status": "error", "user": {}, "jwt": {}, "massage": "Invalid credentials"})


class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({"success": "Loggout Out"})
        except:
            return Response({"error": "Something went wrong when logging out"})


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        csrftoken = request.META.get("CSRF_COOKIE")
        return Response({"success": "CSRF cookie set", "CSRF_COOKIE": csrftoken})
