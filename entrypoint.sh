#!/bin/bash

/usr/bin/mongod --fork --logpath /var/log/mongodb.log

cd /usr/docker-labs/docker-nodejs && node server.js &
cd /usr/docker-labs/docker-angular2 && npm run lite
