FROM node:12-alpine

RUN apk add openssl
WORKDIR /usr/src/app
COPY . .
RUN rm -rf webui
RUN rm -f .env
CMD npm start
