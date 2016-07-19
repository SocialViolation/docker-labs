#!/bin/bash

docker run -it \
	-p 3000:3000 \
  -p 3001:3001 \
	-p 3002:3002 \
  --name "docker-lab2" \
  --add-host=mongohost:127.0.0.1 \
  nickfreemantle/lab2
