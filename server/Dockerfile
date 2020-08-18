FROM node:14.4.0-alpine

# Get project environment setup
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm install

# Get running environment setup
RUN apk add --update --no-cache build-base git openssl linux-headers cpulimit bash

WORKDIR /app
COPY . .

# Escalate privillages of entrypoint script
RUN chmod 755 ./.docker/entrypoint.sh

EXPOSE 5000
ENTRYPOINT [ "./.docker/entrypoint.sh" ]