#!/bin/bash

sudo docker build --tag rambo-io .
sudo docker run -p 80:8082 --name="rambo-io" -d rambo-io