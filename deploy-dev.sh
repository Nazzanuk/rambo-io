#!/usr/bin/env bash

ssh -t -i deployment/rambo-io-new.pem ec2-user@52.11.61.74 bash -c "'
cd rambo-io
sudo git stash save --keep-index
sudo git stash drop
sudo git fetch
sudo git reset --hard origin/master
sudo git pull
sudo npm install --loglevel info
bower install
gulp
sh build-server.sh
'"