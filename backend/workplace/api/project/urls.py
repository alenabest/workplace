# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from workplace.api.project.project import *


urlpatterns = [
    url(r'(?P<pk>[0-9]+)/$', ProjectDetail.as_view()),
    url(r'$', ProjectList.as_view()),
]
