FROM node:14.4.0-alpine

# Get project environment setup
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm install

# Get running environment setup
RUN apk add --update --no-cache build-base git openssl linux-headers cpulimit

WORKDIR /app
COPY . .

EXPOSE 5000
CMD [ "cpulimit", "-l", "50", "node", "server.js" ]