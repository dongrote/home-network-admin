#!/bin/sh

cd $(dirname $(dirname $(realpath "$0")))

TAG=${1:-latest}

npm --prefix webui install && \
npm install && \
bin/build-ui.sh && \
bin/install-ui.sh && \
docker build . -t home-network-admin:${TAG}
