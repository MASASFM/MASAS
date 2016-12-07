""" MAN
https://docs.djangoproject.com/en/1.9/topics/settings/
https://docs.djangoproject.com/en/1.9/ref/settings/
"""

import os
import re
from os.path import abspath, basename, dirname, join, normpath
from socket import gethostname

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DJANGO_ROOT = dirname(dirname(abspath(__file__)))
SITE_ROOT = dirname(DJANGO_ROOT)
SITE_NAME = basename(DJANGO_ROOT)
DEBUG = os.environ.get('DEBUG', False)
LOG_LEVEL = os.environ.get('DJANGO_LOG_LEVEL', 'DEBUG' if DEBUG else 'INFO')

SESSION_COOKIE_HTTPONLY = False

LOG_DIR = os.environ.get(
    'OPENSHIFT_LOG_DIR',
    os.path.join(BASE_DIR, 'log'),
)
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

DATA_DIR = os.environ.get(
    'OPENSHIFT_DATA_DIR',
    os.path.join(BASE_DIR, 'data')
)
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)
SECRET_FILE = os.path.join(DATA_DIR, 'secret.txt')

from django.utils.crypto import get_random_string
if not os.path.exists(SECRET_FILE):
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    with open(SECRET_FILE, 'w+') as f:
        f.write(get_random_string(50, chars))

with open(SECRET_FILE, 'r') as f:
    SECRET_KEY = f.read()

if SECRET_KEY == 'notsecret' and not DEBUG:
    raise Exception('Please export DJANGO_SECRET_KEY or DEBUG')

ALLOWED_HOSTS = [
    gethostname(),
]

DNS = os.environ.get('OPENSHIFT_APP_DNS', None),
if DNS:
    ALLOWED_HOSTS += DNS

if 'DJANGO_ALLOWED_HOSTS' in os.environ:
    ALLOWED_HOSTS += os.environ.get('DJANGO_ALLOWED_HOSTS').split(',')

PUBLIC_DIR = os.path.join(os.environ.get('OPENSHIFT_REPO_DIR', ''), 'wsgi/static')

STATIC_URL = '/static/'
STATIC_ROOT = PUBLIC_DIR
MEDIA_URL = '/static/media/'
MEDIA_ROOT = os.path.join(DATA_DIR, 'media')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # 'pipeline',
    'rest_framework',
    'oauth2_provider',
    'corsheaders',
    'social.apps.django_app.default',
    'rest_framework_social_oauth2',
    'cities_light',
    'MASAS',
    'crispy_forms',
    'explorer',
]

MIDDLEWARE_CLASSES = []

if DEBUG:
    INSTALLED_APPS.append('django_logging',)
    MIDDLEWARE_CLASSES.append(
        'django_logging.middleware.DjangoLoggingMiddleware',
    )

MIDDLEWARE_CLASSES += [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

AUTH_USER_MODEL = 'MASAS.User'

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_FILTER_BACKENDS': ('rest_framework.filters.DjangoFilterBackend',),
    'PAGE_SIZE': 100
}

# oauth
CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'settings_masas.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    }
]

WSGI_APPLICATION = 'settings_masas.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
    'default': {
        'NAME': os.environ.get('DJANGO_DATABASE_NAME', 'db.sqlite3'),
        'USER': os.environ.get('DJANGO_DATABASE_USER', ''),
        'PASSWORD': os.environ.get('DJANGO_DATABASE_PASSWORD', ''),
        'HOST': os.environ.get('DJANGO_DATABASE_HOST', ''),
        'PORT': os.environ.get('DJANGO_DATABASE_PORT', ''),
        'ENGINE': os.environ.get('DJANGO_DATABASE_ENGINE',
                                 'django.db.backends.sqlite3'),

    }
}

if 'OPENSHIFT_DATA_DIR' in os.environ:
    DATABASES['default']['NAME'] = os.path.join(DATA_DIR, 'db.sqlite')

if 'OPENSHIFT_POSTGRESQL_DB_HOST' in os.environ:
    DATABASES['default']['NAME'] = os.environ['OPENSHIFT_APP_NAME']
    DATABASES['default']['USER'] = os.environ[
        'OPENSHIFT_POSTGRESQL_DB_USERNAME']
    DATABASES['default']['PASSWORD'] = os.environ[
        'OPENSHIFT_POSTGRESQL_DB_PASSWORD']
    DATABASES['default']['HOST'] = os.environ['OPENSHIFT_POSTGRESQL_DB_HOST']
    DATABASES['default']['PORT'] = os.environ['OPENSHIFT_POSTGRESQL_DB_PORT']
    DATABASES['default']['ENGINE'] = 'django.db.backends.postgresql_psycopg2'

# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAdminUser',
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'PAGE_SIZE': 100,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.ext.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    )
}

TEMPLATE_CONTEXT_PROCESSORS = (
    'social.apps.django_app.context_processors.backends',
    'social.apps.django_app.context_processors.login_redirect',
)

AUTHENTICATION_BACKENDS = (
    # Facebook OAuth2
    'social.backends.facebook.FacebookAppOAuth2',
    'social.backends.facebook.FacebookOAuth2',

    # django-rest-framework-social-oauth2
    'rest_framework_social_oauth2.backends.DjangoOAuth2',

    # Django
    'django.contrib.auth.backends.ModelBackend',
)

# Facebook configuration
SOCIAL_AUTH_FACEBOOK_KEY = os.environ.get(
    'FACEBOOK_KEY',
    '433759926818956'
)
SOCIAL_AUTH_FACEBOOK_SECRET = os.environ.get(
    'FACEBOOK_SECRET',
    '09333f2e3964f73fdc0c6a9488122bb8'
)

SOUNDCLOUD = {
    'CLIENT_ID': os.environ.get(
        'SOUNDCLOUD_CLIENT_ID',
        'e5d965905a85b11e108d064bc04430a3',
    ),
    'REDIRECT_URI': os.environ.get(
        'SOUNDCLOUD_REDIRECT_URI',
        'http://dev2-masas.rhcloud.com/sc-callback',
    ),
    'FETCH_URI': os.environ.get(
        'SOUNDCLOUD_FETCH_URI',
        'me/favorites'
        )
}

# Define SOCIAL_AUTH_FACEBOOK_SCOPE to get extra permissions from facebook. Email is not sent by default, to get it, you must request the email permission:
SOCIAL_AUTH_FACEBOOK_SCOPE = ['tbinetruy@gmail.com']

CITIES_LIGHT_CITY_SOURCES = [
    'http://download.geonames.org/export/dump/cities5000.zip'
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'simple': {
            'format': '%(levelname)s[%(module)s]: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'level': LOG_LEVEL,
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': LOG_LEVEL,
        },
    },
}

if DEBUG:
    LOGGING['handlers']['debug'] = {
        'level': 'DEBUG',
        'class': 'logging.FileHandler',
        'filename': os.path.join(LOG_DIR, 'debug.log'),
    }

    for logger in LOGGING['loggers'].values():
        logger['handlers'].append('debug')

RAVEN_FILE = os.path.join(DATA_DIR, 'sentry')
if os.path.exists(RAVEN_FILE):
    INSTALLED_APPS += ('raven.contrib.django.raven_compat',)

    LOGGING['handlers']['sentry'] = {
        'level': 'INFO',
        'class': 'raven.contrib.django.raven_compat.handlers.SentryHandler',
    }
    LOGGING['loggers']['sentry.errors'] = LOGGING['loggers']['raven'] = {
        'level': 'INFO',
        'handlers': ['console'],
        'propagate': False,
    }

    with open(RAVEN_FILE, 'r') as f:
        RAVEN_CONFIG = {
            'dsn': f.read().strip()
        }
        RAVEN_JS_DSN = re.sub(
            r'://(.*):[^@]*@',
            '://\\1@',
            RAVEN_CONFIG['dsn'],
        )
