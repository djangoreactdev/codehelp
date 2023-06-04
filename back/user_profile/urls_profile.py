from django.urls import path
from .views_profile import GetUserProfileView, UpdateUserProfileView, DeleteAccountView

urlpatterns = [
    path("user/<str:pk>/", GetUserProfileView.as_view()),
    path("update/<str:pk>/", UpdateUserProfileView.as_view()),
    path("delete/<str:pk>/", DeleteAccountView.as_view()),
]
