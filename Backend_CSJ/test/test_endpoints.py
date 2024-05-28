import json

import requests


def test_endpoint_buscar():
	url = "https://ldap.pri-ramajudicial.ml/elastic/buscar?page=1&limit=10"

	payload = json.dumps({
		"texto_buscar": "ley"
	})
	headers = {
		'Content-Type': 'application/json'
	}

	data = requests.request("POST", url, headers=headers, data=payload).json()
	assert 'results' in data


def test_endpoint_dropdown():
	url = "https://ldap.pri-ramajudicial.ml/elastic/decision"

	payload = {}
	headers = {}

	data = requests.request("GET", url, headers=headers, data=payload).json()

	assert 'results' in data


def test_endpoint_autocompletar():
	url = "https://ldap.pri-ramajudicial.ml/elastic/autocompletar"

	payload = json.dumps({
		"texto": "ley"
	})
	headers = {
		'Content-Type': 'application/json'
	}

	data = requests.request("POST", url, headers=headers, data=payload).json()

	assert type(data) == list


def test_endpoint_login():
	url = "https://ldap.pri-ramajudicial.ml/accounts/login/"

	payload = json.dumps({
		"username": "",
		"password": "",
		"recaptcha": ""
	})
	headers = {
		'Content-Type': 'application/json'
	}

	data = requests.request("POST", url, headers=headers, data=payload).json()

	assert 'refresh' in data
