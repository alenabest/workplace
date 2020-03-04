# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from workplace.api.role.role import *


urlpatterns = [
    url(r'(?P<pk>[0-9]+)/$', RoleDetail.as_view()),
    url(r'$', RoleList.as_view()),
]
