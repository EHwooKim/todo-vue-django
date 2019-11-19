from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.todo_index_create),
    path('todos/<int:id>/', views.todo_update_delete),
    path('users/<int:id>/', views.user_detail),
]