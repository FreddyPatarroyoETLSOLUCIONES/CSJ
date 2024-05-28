from apps.accounts.models import User


def get_user_from_request(request):
    try:
        username = request.user.username
        if not username:
            return User.objects.get(username='usuario_externo').username
        return request.user.username
    except Exception:
        return User.objects.get(username='usuario_externo').username


def get_tipo_user_from_request(request):
    username = request.user.username
    if not username:
        return 'externo'
    return 'interno'
