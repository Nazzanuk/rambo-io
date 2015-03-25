#!/bin/bash

$(boot2docker shellinit)
docker build --tag rambo-io .
docker stop rambo-io
docker rm rambo-io
docker run -p 8082:8082 --name="rambo-io" -d rambo-io