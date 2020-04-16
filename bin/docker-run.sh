#!/bin/sh

TAG=${1:-latest}
docker run --env-file .env --expose 3000 -p 3000:3000 home-network-admin:${TAG}
