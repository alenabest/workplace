# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from workplace.api.report.report import *


urlpatterns = [
    url(r'(?P<pk>[0-9]+)/download/$', download),
    url(r'(?P<pk>[0-9]+)/$', ReportDetail.as_view()),
    url(r'generate/$', generate_report),
    url(r'$', ReportList.as_view()),
]
