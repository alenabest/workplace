# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from workplace.api.activity.activity import *


urlpatterns = [
    url(r'validate/$', validate_activity),
    url(r'(?P<pk>[0-9]+)/$', ActivityDetail.as_view()),
    url(r'$', ActivityList.as_view()),
]
