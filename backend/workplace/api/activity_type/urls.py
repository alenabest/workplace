# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from workplace.api.activity_type.activity_type import *


urlpatterns = [
    url(r'(?P<pk>[0-9]+)/$', ActivityTypeDetail.as_view()),
    url(r'$', ActivityTypeList.as_view()),
]
