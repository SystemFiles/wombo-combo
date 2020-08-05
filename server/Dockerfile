FROM node:14.4.0-alpine

WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD [ "node", "server.js" ]