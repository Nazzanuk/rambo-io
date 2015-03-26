#!/usr/bin/env bash

ssh -t -i deployment/rambo-io-new.pem ec2-user@52.11.61.74 bash -c "'
cd rambo-io
git fetch
git reset --hard origin/master
git pull
sudo npm install --loglevel info
bower install
gulp
sh build-server.sh
'"