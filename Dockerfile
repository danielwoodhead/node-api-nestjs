FROM node:16.19.1-alpine3.16 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prisma:generate && npm run lint && npm test && npm run build

FROM node:16.19.1-alpine3.16
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=build /usr/src/app/dist dist/
COPY --from=build /usr/src/app/node_modules/.prisma/client node_modules/.prisma/client
EXPOSE 3000
CMD ["node", "./dist/main.js"]
