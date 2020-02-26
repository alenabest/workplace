from backend.settings.default import *


DEBUG = True

ALLOWED_HOSTS = ['*', ]

INSTALLED_APPS += [
    'django_filters',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_swagger',
    'workplace'
]

AUTH_USER_MODEL = 'workplace.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 100
}

ROOT_URLCONF = 'backend.urls.production'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['DATABASE_NAME'],
        'USER': os.environ['DATABASE_USER'],
        'PASSWORD': os.environ['DATABASE_PASSWORD'],
        'HOST': os.environ['DATABASE_HOST'],
        'PORT': os.environ['DATABASE_PORT'],
    }
}

MEDIA_URL = '/media/'
MEDIA_DIR = os.path.join(BASE_DIR, 'media')

ASSETS_URL = '/assets/'
ASSETS_ROOT = os.path.join(BASE_DIR, 'static', 'assets')

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = ()
