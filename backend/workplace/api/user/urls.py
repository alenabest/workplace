# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from workplace.api.user.user import *


urlpatterns = [
    url(r'profile/$', get_user_profile),
    url(r'change-password/$', change_password),
    url(r'(?P<pk>[0-9]+)/upload-avatar/$', upload_avatar),
    url(r'(?P<pk>[0-9]+)/$', UserDetail.as_view()),
    url(r'$', UserList.as_view()),
]
