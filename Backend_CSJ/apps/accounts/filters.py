import django_filters

from apps.accounts.models import User


class UserFilter(django_filters.FilterSet):
    username = django_filters.CharFilter(lookup_expr='icontains')
    full_name = django_filters.CharFilter(lookup_expr='icontains')
    roles = django_filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = User
        fields = ['username', 'full_name', 'roles']
