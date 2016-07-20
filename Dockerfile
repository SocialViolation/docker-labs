# LAB 2 - this is a comment
FROM ubuntu:14.04
MAINTAINER Your name "youremail@email.com"

#Using local *.deb files instead of downloading them 
ADD debs/* /debs/
RUN echo "deb file:/debs ./" > /etc/apt/sources.list

# Make sure apt is up to date
RUN apt-get update

# Install mongodb
RUN apt-get install -y --force-yes mongodb-org

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Install nodejs, npm
RUN apt-get install -y --force-yes nodejs npm

# Workaround for Debian as it installs 'node' as 'nodejs'
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10

# Create working directory
RUN mkdir -p /usr/docker-labs/

# Set working directory
WORKDIR /usr/docker-labs/

# Bundle projects source
ADD . /usr/docker-labs/

EXPOSE 3000
ENTRYPOINT ["bash", "./entrypoint.sh"]
