#!/usr/bin/env bash
sudo -u postgres psql -c "DROP DATABASE workplace;" || echo 'Database not exist'
sudo -u postgres psql -c "CREATE DATABASE workplace;"
sudo -u postgres psql -c "GRANT ALL ON DATABASE workplace TO workplace;"


SETTINGS="--settings backend.settings.development"

# shellcheck disable=SC2086
python manage.py migrate $SETTINGS
# shellcheck disable=SC2086
python manage.py loaddata                   \
    workplace/fixtures/users                 \
    $SETTINGS
# shellcheck disable=SC2086
python manage.py loaddata                   \
    workplace/fixtures/dictionary            \
    $SETTINGS

celery -A workplace worker --loglevel=info
