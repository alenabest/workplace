# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from workplace.api.direction.direction import *


urlpatterns = [
    url(r'(?P<pk>[0-9]+)/$', DirectionDetail.as_view()),
    url(r'$', DirectionList.as_view()),
]
