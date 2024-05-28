from django.forms import model_to_dict
from rest_framework import authentication, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication


class PrivateMixin(object):
    authentication_classes = (
        authentication.BasicAuthentication,
        authentication.TokenAuthentication,
        JWTAuthentication
    )
    permission_classes = (
        permissions.IsAuthenticated,
    )


class PublicMixin(object):
    permission_classes = [permissions.AllowAny]


class ModelDiffMixin(object):

    def __init__(self, *args, **kwargs):
        super(ModelDiffMixin, self).__init__(*args, **kwargs)
        self.__initial = self._dict

    @property
    def diff(self):
        d1 = self.__initial
        d2 = self._dict
        diffs = [(k, (v, d2[k])) for k, v in d1.items() if v != d2[k]]
        return dict(diffs)

    @property
    def has_changed(self):
        return bool(self.diff)

    @property
    def changed_fields(self):
        return self.diff.keys()

    def get_field_diff(self, field_name):
        return self.diff.get(field_name, None)

    def save(self, *args, **kwargs):
        super(ModelDiffMixin, self).save(*args, **kwargs)
        self.__initial = self._dict

    @property
    def _dict(self):
        return model_to_dict(self, fields=[field.name for field in self._meta.fields])
