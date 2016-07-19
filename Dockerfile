# LAB 2 - this is a comment
FROM ubuntu:14.04
MAINTAINER Your name "youremail@email.com"

# Adding the MongoDB Repository
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list

# Make sure apt is up to date
RUN apt-get update

# Install mongodb
RUN apt-get install -y mongodb-org

# Create the MongoDB data directory
RUN mkdir -p /data/db

# Install nodejs, npm
RUN apt-get install -y nodejs npm

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
