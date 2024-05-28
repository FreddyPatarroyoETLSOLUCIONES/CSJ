from django.http import JsonResponse


def index(request):
    return JsonResponse({'message': 'It works'}, content_type='application/json')