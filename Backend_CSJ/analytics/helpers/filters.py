from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend


class CustomFilter(filters.FilterSet):
    filter_backends = (DjangoFilterBackend,)
    paginate_by = 10
    max_paginate_by = 10
