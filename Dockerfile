#FROM node:12-alpine AS webui-builder
#WORKDIR /usr/src/app
#COPY webui .
#RUN npm i
#RUN npm run build

FROM node:12-alpine AS server-builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm i

FROM node:12-alpine
RUN apk add openssl
WORKDIR /usr/src/app
COPY . .
COPY --from=server-builder /usr/src/app/ .
RUN rm -rf .env webui
CMD npm start
