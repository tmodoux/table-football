FROM node:18-alpine as node-image
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "start"]
EXPOSE 4000