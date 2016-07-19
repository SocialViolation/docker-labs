# LAB 2 - nodejs + mongo image
FROM ubuntu:16.04
MAINTAINER Your name "ng.freemantle@gmail.com"

# Adding the MongoDB Repository
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# make sure apt is up to date
RUN apt-get update

# install mongodb
RUN apt-get install -y --allow-unauthenticated mongodb-org

# Create the MongoDB data directory
RUN mkdir -p /data/db

# install nodejs, npm
RUN apt-get install -y nodejs npm

# Workaround for Debian as it installs 'node' as 'nodejs'
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json /usr/src/app/
RUN npm install

# Bundle app source
ADD . /usr/src/app

EXPOSE 8080
ENTRYPOINT ["bash", "./entrypoint.sh"]
