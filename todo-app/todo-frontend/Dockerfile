FROM node:16 AS build-stage

ENV REACT_APP_BACKEND_URL=/api

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm test

RUN npm run build

FROM nginx:1.21-alpine

EXPOSE 3000

COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
