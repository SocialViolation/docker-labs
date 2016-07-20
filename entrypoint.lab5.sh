#!/bin/bash

cd /usr/docker-labs/docker-nodejs && node server.js &
cd /usr/docker-labs/docker-angular2 && npm run lite
