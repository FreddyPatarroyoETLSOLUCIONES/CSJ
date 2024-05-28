from django.urls import path

from apps.accounts.views import LoginView
from apps.accounts.views.users_view import RolesView, UsersListView, UpdateUserView

urlpatterns = [
    path('login/', LoginView.as_view(), name='token_obtain_pair'),
    path('roles', RolesView.as_view(), name='roles'),
    path('usuarios', UsersListView.as_view(), name='usuarios'),
    path('usuario/<uuid:id>', UpdateUserView.as_view(), name='usuario'),
]
