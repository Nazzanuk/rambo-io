#!/bin/bash

$(boot2docker shellinit)
docker build --tag rambo-io .
docker run -p 5000:8082 --name="rambo-io" -d rambo-io