#!/bin/sh

TAG=${1:-latest}
docker run \
  -d \
  --env-file .env \
  --expose 3000 \
  -p 3000:3000 \
  --volume home-network-admin:/var/run/home-network-admin \
  home-network-admin:${TAG}
