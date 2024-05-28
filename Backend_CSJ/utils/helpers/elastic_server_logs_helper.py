import base64
import json
import os
from datetime import datetime

import pytz
import requests
from geoip2.errors import AddressNotFoundError
import geoip2.database
from rest_framework import status
from rest_framework.exceptions import APIException

from apps.accounts.helpers.users import get_user_from_request
from utils.constants.elastic_server import ELASTIC_SERVER_LOGS_USER, ELASTIC_SERVER_LOGS_PASSWORD, \
    ELASTIC_SERVER_LOGS_URL
from utils.helpers.singleton import Singleton


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class ElasticServerLogsHelper(metaclass=Singleton):
    headers = {}

    def __init__(self):
        user_password = f'{ELASTIC_SERVER_LOGS_USER}:{ELASTIC_SERVER_LOGS_PASSWORD}'
        self.headers = {'Authorization': f'Basic {base64.b64encode(bytes(user_password, "utf-8")).decode("utf-8")}'}

    def save_log(self, data: dict, request, initial_data=None, username=None, descripcion_error=None, es_error='No'):
        headers_json = {**{'Content-Type': 'application/json'}, **self.headers}

        if 'json_valor_inicial' in data:
            data['json_valor_inicial'] = json.dumps(data['json_valor_inicial'])

        if 'json_resultado' in data:
            data['json_resultado'] = json.dumps(data['json_resultado'])

        ip_address = request.META.get('HTTP_X_FORWARDED_FOR', '127.0.0.1')
        data.update({
          "fecha_creacion": datetime.now(pytz.timezone('America/Bogota')).strftime("%Y-%m-%dT%H:%M:%S-0500"),
          "ip_addr": ip_address,
          "ciudad": ElasticServerLogsHelper().get_city_by_ip(ip_address),
          "usuario": get_user_from_request(request) if not username else username,
            "descripcion_error": descripcion_error,
            "es_error": es_error
        })
        if initial_data:
            data.update({'json_valor_inicial': str(initial_data)})
        parsed_data = json.dumps(data, default=str)

        response = requests.post(f'{ELASTIC_SERVER_LOGS_URL}/pri_log/_doc/', headers=headers_json, data=parsed_data,
                                 verify=False)
        if response.status_code == status.HTTP_201_CREATED:
            if 'error' in response.json():
                raise APIException(response.reason)
            return response.json()
        raise APIException(response.reason)

    def get_city_by_ip(self, ip_address):
        geo_city_db_path = f'{BASE_DIR}/utils/resources/GeoLite2-City.mmdb'
        with geoip2.database.Reader(geo_city_db_path) as reader:
            try:
                city = reader.city(ip_address).city.name
            except AddressNotFoundError as ex:
                city = 'desconocido'
        return city

    def filter_logs(self, payload):
        headers_json = {**{'Content-Type': 'application/json'}, **self.headers}
        parsed_data = json.dumps(payload, default=str)
        response = requests.post(f'{ELASTIC_SERVER_LOGS_URL}/pri_log/_search/', headers=headers_json, data=parsed_data,
                                 verify=False)
        if response.status_code == status.HTTP_200_OK:
            if 'error' in response.json():
                raise APIException(response.reason)
            return response.json()
        raise APIException(response.reason)


