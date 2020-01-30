# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf.urls import url, include
from rest_framework.authtoken import views

urlpatterns = [
    url(r'^login/', views.obtain_auth_token),
    url(r'^activity/', include(('workplace.api.activity.urls', 'workplace'), namespace='activity')),
    url(r'^activity-type/', include(('workplace.api.activity_type.urls', 'workplace'), namespace='activity_type')),
    url(r'^direction/', include(('workplace.api.direction.urls', 'workplace'), namespace='direction')),
    url(r'^project/', include(('workplace.api.project.urls', 'workplace'), namespace='project')),
    url(r'^user/', include(('workplace.api.user.urls', 'workplace'), namespace='user')),
]
