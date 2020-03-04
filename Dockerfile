### STAGE 1: Build ###
FROM node:10-alpine as builder
MAINTAINER Alena Hrenovskaya <yourally69@gmail.com>

RUN mkdir -p /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm ci && cp -R ./node_modules /app/frontend
WORKDIR /app/frontend
COPY frontend/ /app/frontend
RUN node --max_old_space_size=16384 node_modules/@angular/cli/bin/ng build --prod --base-href='/' --deploy-url='/static/'


### STAGE 2: WEB ###
FROM debian AS web
MAINTAINER Alena Hrenovskaya <yourally69@gmail.com>

ARG DJANGO_SETTINGS_MODULE='workplace.settings.production'
ARG DATABASE_NAME='workplace'
ARG DATABASE_USER='postgres'
ARG DATABASE_PASSWORD=''
ARG DATABASE_HOST='localhost'
ARG DATABASE_PORT=5432

#ENV PYTHONUNBUFFERED 1
ENV POSTGRES_HOST=$POSTGRES_HOST
ENV POSTGRES_PORT=$POSTGRES_PORT
ENV POSTGRES_DATABASE=$POSTGRES_DATABASE
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE

ENV LANG ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8
ENV LANGUAGE ru_RU.UTF-8

RUN apt-get update &&
    apt-get install -y wget git python3 python3-dev python3-pip nginx supervisor sqlite3 locales default-jre && \
    apt-get install -y postgresql-client-10 software-properties-common nano mc && \
    pip3 install -U pip setuptools && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN wget http://downloadarchive.documentfoundation.org/libreoffice/old/6.0.7.3/deb/x86_64/LibreOffice_6.0.7.3_Linux_x86-64_deb.tar.gz

RUN apt-get -y dist-upgrade
RUN apt-get install -y wget gnupg p7zip-full
RUN echo 'deb http://apt.postgresql.org/pub/repos/apt/ stretch-pgdg main' >  /etc/apt/sources.list.d/pgdg.list
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

RUN tar -zxvf LibreOffice_6.0.7.3_Linux_x86-64_deb.tar.gz && \
    dpkg -i LibreOffice_6.0.7.3_Linux_x86-64_deb/DEBS/*.deb && \
    ln -sf /opt/libreoffice6.0/program/soffice /usr/bin/libreoffice && \
    ln -sf /opt/libreoffice6.0/program/soffice /usr/bin/soffice
    rm -rf LibreOffice_6.3.2_Linux_x86-64_deb.tar.gz
    rm -rf LibreOffice_6.3.2.2_Linux_x86-64_deb

RUN sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen && \
    sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen && \
    update-locale LANG=ru_RU.UTF-8 && \
    echo "LANGUAGE=ru_RU.UTF-8" >> /etc/default/locale && \
    echo "LC_ALL=ru_RU.UTF-8" >> /etc/default/locale

RUN	pip3 install uwsgi

RUN echo 'daemon off;' >> /etc/nginx/nginx.conf

RUN mkdir -p /app/configs
RUN mkdir -p /app/backend
RUN mkdir -p /app/bin

COPY bin/wait-for-postgres.sh /usr/bin/wait-for-postgres.sh
COPY backend/requirements.txt /app/backend/requirements.txt
COPY configs/uwsgi-app.ini /app/configs/uwsgi-app.ini
COPY configs/uwsgi_params /app/configs/uwsgi_params

COPY --from=builder /app/frontend/dist/frontend/index.html /app/backend/templates/index.html
COPY --from=builder /app/frontend/dist/frontend/ /app/backend/static/


COPY configs/nginx-app.conf /etc/nginx/sites-available/default
COPY configs/supervisor-app.conf /etc/supervisor/conf.d/

COPY requirements.txt /app/backend/
RUN pip install -r /app/backend/requirements.txt

WORKDIR /app/backend/
COPY . .

RUN chown -R www-data:www-data .
RUN python manage.py collectstatic --noinput

VOLUME /app/backend/logs
VOLUME /app/backend/media

#VOLUME '/app/backend'
#VOLUME '/app/bin'
#VOLUME '/app/configs'

EXPOSE 80

CMD ["supervisord", "-n"]
