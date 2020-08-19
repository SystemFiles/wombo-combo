FROM node:14.4.0-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install
RUN npm install -g serve
RUN apk add --update bash git openssl

COPY . .
RUN npm run build

EXPOSE 3000
ENTRYPOINT [ "./.docker/entrypoint.sh" ]