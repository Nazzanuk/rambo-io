#!/bin/bash

sudo docker build -t rambo-io .
sudo docker run -p 5000:8082 rambo-io