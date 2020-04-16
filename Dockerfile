FROM node:12-alpine

WORKDIR /usr/src/app
COPY . .
RUN rm -rf webui
RUN rm -f .env
CMD npm start
