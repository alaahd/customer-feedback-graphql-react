FROM node:12.10.0-alpine
WORKDIR /usr/app
RUN npm install -g prisma
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
RUN apk update && apk add bash
RUN chmod +x /usr/app/wait-for-it.sh
