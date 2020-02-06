# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url

from workplace.api.report.report import *


urlpatterns = [
    url(r'generate/$', generate_report),
    url(r'(?P<pk>[0-9]+)/$', ReportDetail.as_view()),
    url(r'$', ReportList.as_view()),
]
