FROM node:12-alpine AS webui-builder
WORKDIR /usr/src/app
COPY webui .
RUN npm i
RUN npm run build

FROM node:12-alpine AS server-builder
WORKDIR /usr/src/app
COPY . .
RUN rm -rf webui
RUN npm i

FROM node:12-alpine
RUN apk add openssl
WORKDIR /usr/src/app
COPY --from=server-builder /usr/src/app/ .
COPY --from=webui-builder /usr/src/app/build/ /usr/src/app/public
RUN rm -f .env
CMD npm start
