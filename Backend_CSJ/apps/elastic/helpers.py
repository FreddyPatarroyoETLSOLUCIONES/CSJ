import base64
import mimetypes
import os
from os.path import isfile, join


def get_image_base64(anexo1, extra_origen_id=None, download_video=False):
    try:
        allowed_formats = ["jpg", "png", "jpeg"]
        allowed_extra_origens = [27, 19]
        if download_video:
            allowed_formats.append("mp4")
            allowed_extra_origens.append(26)

        image = next((item for item in anexo1 if item["tipo"].lower() in allowed_formats and (item.get('tipourl') == "1" or extra_origen_id in allowed_extra_origens)), None)
        if not image:
            image = next((item for item in anexo1 if item["tipo"].lower() in ["html"]), None)
        filepath = f"/csj_fs/{image.get('url').split('/csjanaliticadevfs/')[1]}" if image else ''
        if not os.path.isfile(filepath):
            return {'error': 'File not found'}
        if filepath.endswith('.html'):
            anexos_files = [f for f in os.listdir(f'{os.path.dirname(filepath)}') if
                            isfile(join(f'{os.path.dirname(filepath)}', f)) and (
                                        f.endswith(".png") or f.endswith(".jpg") or f.endswith(".jpeg"))]
            if anexos_files:
                filepath = f'{os.path.dirname(filepath)}/{anexos_files[0]}'

        mime_type, _ = mimetypes.guess_type(filepath)
        file_name = os.path.basename(filepath)
        encoded_string = base64.b64encode(open(filepath, 'rb').read()).decode()
        return {
            'file_name': file_name,
            'extension': file_name.split('.')[1:][0],
            'base64_file': encoded_string,
            'mime_type': mime_type
        }
    except:
        return None