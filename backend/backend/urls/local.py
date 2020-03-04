from django.conf import settings
from django.conf.urls.static import static
from rest_framework_swagger.views import get_swagger_view

from backend.urls.default import *

schema_view = get_swagger_view(title='Workplace API')

urlpatterns += [
    url(r'^swagger/', schema_view),
    url(r'^workplace/', include('workplace.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
