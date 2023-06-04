from django.urls import path

from .views import PostList, PostCategory, PostDetail
from .views import CategoryDetail, CategoryList, CategoryDetailSlug, CategoryListDepth
from .views import HashTagList, HashTagDetail

urlpatterns = [
    path("category/depth/", CategoryListDepth.as_view()),
    path("category/", CategoryList.as_view()),
    path("category/<int:pk>", CategoryDetail.as_view()),
    path("category/slug/<str:pk>/", CategoryDetailSlug.as_view()),
    path("post/", PostList.as_view()),
    path("post/<int:pk>/", PostDetail.as_view()),
    path("<str:pk>/post/", PostCategory.as_view()),
    path("hashtag/", HashTagList.as_view()),
    path("hashtag/<int:pk>/", HashTagDetail.as_view()),
]
