FROM node:14.4.0-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install
RUN npm install -g serve

COPY . .
RUN npm build

EXPOSE 3000
ENTRYPOINT [ "serve", "-s", "build/", "-l", "3000" ]