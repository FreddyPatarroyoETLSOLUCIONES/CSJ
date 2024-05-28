import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import pytz

from apps.accounts.helpers.users import get_user_from_request
from apps.administration.models import AppSettings
from utils.helpers.elastic_server_logs_helper import ElasticServerLogsHelper

mimemsg = MIMEMultipart()


def send_email_alert(subject: str, message, request, send_email=False, time_start=0, datetime_start=None):
    if send_email and int((datetime.now(pytz.timezone('America/Bogota')) - datetime_start).total_seconds()) > 5:
        app_settings = AppSettings.objects.first()

        mimemsg['From'] = app_settings.email_notifications_mail_from
        mimemsg['To'] = ", ".join(app_settings.email_notifications_mails_to)
        mimemsg['Subject'] = subject
        message_email = f'''
El sistema presentó demora en la respuesta a una consulta, superando el tiempo
esperado. A continuación, puede ver los datos de la consulta realizada:
Fecha y hora de la consulta: {datetime_start.strftime("%Y-%m-%dT%H:%M:%S")}
Fecha y hora de respuesta: {datetime.now(pytz.timezone('America/Bogota')).strftime("%Y-%m-%dT%H:%M:%S")}
Total de resultados encontrados: {message["resultados_encontrados"]}


Criterios de consulta: {message["busqueda"]}
        
        
Recuerde que puede consultar el log de auditoría, autenticándose en la Plataforma de recuperación de
información e ingresando a la opción correspondiente.
Nota: Este es un correo automático, por favor no responder a este.”
'''
        mimemsg.attach(MIMEText(message_email, 'plain'))

        connection = smtplib.SMTP(host=app_settings.email_notifications_smtp, port=app_settings.email_notifications_port)
        connection.starttls()
        connection.login(app_settings.email_notifications_username, app_settings.email_notifications_password)
        connection.send_message(mimemsg)
        connection.quit()

        message['funcionalidad'] = "Enviar alertas"
        message['accion'] = "Enviar alertas"
        message['json_resultado'] = {'nombre_alerta': subject, 'correo_enviado': mimemsg['To']}
        message['json_resultado'] = {'nombre_alerta': subject, 'correo_enviado': mimemsg['To']}
        message["json_valor_inicial"] = {'nombre_alerta': subject}

        ElasticServerLogsHelper().save_log(message, request, username=get_user_from_request(request))
