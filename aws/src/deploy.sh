#!/bin/bash
REPOSITORY=/home/ubuntu
cd $REPOSITORY/server/node

sudo npm install -y

pm2 restart 0