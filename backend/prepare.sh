#!/usr/bin/env bash

# python manage.py dumpdata workplace --indent 2 > workplace/fixtures/workplace.json

sudo -u postgres psql -c "DROP DATABASE workplace;" || echo 'Database not exist'
sudo -u postgres psql -c "CREATE DATABASE workplace;"
sudo -u postgres psql -c "GRANT ALL ON DATABASE workplace TO workplace;"

python manage.py migrate
python manage.py loaddata workplace/fixtures/workplace
#python manage.py loaddata                   \
#    workplace/fixtures/users
#python manage.py loaddata                   \
#    workplace/fixtures/dictionary

celery -A workplace worker --loglevel=info
