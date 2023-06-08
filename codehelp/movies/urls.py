from django.urls import path

from .views import MovieDetail, MovieList

urlpatterns = [
    path("movies/", MovieList.as_view()),
    path("movies/<int:pk>/", MovieDetail.as_view()),
]
