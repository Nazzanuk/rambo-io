#!/bin/bash

$(boot2docker shellinit)
docker build -t rambo-io .
docker run -p 5000:8082 rambo-io