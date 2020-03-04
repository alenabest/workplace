from backend.urls.default import *

from django.views.generic import TemplateView
from rest_framework_swagger.views import get_swagger_view


schema_view = get_swagger_view(title='ELibrary API')


urlpatterns += [
    url(r'^swagger/', schema_view),
    url(r'^workplace/', include('workplace.urls')),

    url(r'^.*$', TemplateView.as_view(template_name="index.html"))
]
