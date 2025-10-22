FROM mysql:latest

WORKDIR /usr/src/app

# NOTE: eveyrtime you rebuild the docker container again rebuild the image
# to ensure new schema in conatiners
COPY db.sql /docker-entrypoint-initdb.d/

