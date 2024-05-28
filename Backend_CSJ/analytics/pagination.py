from rest_framework import pagination
from rest_framework.response import Response


class PaginationClass(pagination.PageNumberPagination):
    page_size_query_param = 'limit'

    def get_paginated_response(self, data):
        return Response({
            'next_page': self.page.next_page_number() if self.get_next_link() else None,
            'previous_page': self.page.previous_page_number() if self.get_previous_link() else None,
            'total_records': self.page.paginator.count,
            'current_page': self.page.number,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })