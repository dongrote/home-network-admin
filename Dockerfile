FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
RUN rm -rf webui
CMD npm start
