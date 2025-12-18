# syntax=docker/dockerfile:1
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV VITE_LOCALE=en
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server.js ./server.js
COPY package.json ./package.json
RUN npm install --omit=dev
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]

