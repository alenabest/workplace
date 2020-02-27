#!/usr/bin/env bash

SETTINGS="--settings backend.settings.development"

# python manage.py dumpdata workplace --indent 2 > workplace/fixtures/workplace.json $SETTINGS

sudo -u postgres psql -c "DROP DATABASE workplace;" || echo 'Database not exist'
sudo -u postgres psql -c "CREATE DATABASE workplace;"
sudo -u postgres psql -c "GRANT ALL ON DATABASE workplace TO workplace;"

# shellcheck disable=SC2086
python manage.py migrate $SETTINGS

# shellcheck disable=SC2086
python manage.py loaddata workplace/fixtures/workplace $SETTINGS
# shellcheck disable=SC2086
#python manage.py loaddata                   \
#    workplace/fixtures/users                 \
#    $SETTINGS
# shellcheck disable=SC2086
#python manage.py loaddata                   \
#    workplace/fixtures/dictionary            \
#    $SETTINGS

celery -A workplace worker --loglevel=info
