from django.views.generic import TemplateView

from .urls import *

urlpatterns += url(r'^.*$', TemplateView.as_view(template_name="index.html"))
