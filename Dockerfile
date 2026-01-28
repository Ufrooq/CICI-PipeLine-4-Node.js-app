FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

COPY . .

EXPOSE 8080

CMD ["node","server.js"]