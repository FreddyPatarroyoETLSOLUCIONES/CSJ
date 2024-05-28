import requests

from analytics.settings import RECAPTCHA_PRIVATE_KEY


def recaptcha_verify(recaptcha):
    url = "https://www.google.com/recaptcha/api/siteverify"
    headers = {'User-Agent': 'DebuguearApi-Browser', }
    params = {'secret': RECAPTCHA_PRIVATE_KEY, 'response': recaptcha}
    verify_rs = requests.post(url, params, headers=headers)
    verify_rs = verify_rs.json()
    is_valid = verify_rs.get("success", False)
    return is_valid
