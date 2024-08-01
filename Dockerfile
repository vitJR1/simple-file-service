FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=build /app /app

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]
