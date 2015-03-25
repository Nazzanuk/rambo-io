#!/usr/bin/env bash

ssh -t -i deployment/andigital-website.pem ec2-user@52.16.53.51 bash -c "'
cd rambo-io
git fetch
git reset --hard origin/master
git pull
sudo npm install
bower install
gulp
gulp set-dev
sh build.sh
'"