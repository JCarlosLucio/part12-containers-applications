FROM node:16 AS build-stage

ENV REACT_APP_HTTP_LINK_URI=http://localhost:8080/graphql/
ENV REACT_APP_WS_LINK_URI=ws://localhost:8080/graphql/

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.21-alpine

EXPOSE 3000

COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html