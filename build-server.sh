#!/bin/bash

sudo docker build --tag rambo-io .
sudo docker run -p 5000:8082 rambo-io