#!/bin/bash

sudo docker build --tag rambo-io .
sudo docker run -p 5000:8082 --name="rambo-io" -d rambo-io