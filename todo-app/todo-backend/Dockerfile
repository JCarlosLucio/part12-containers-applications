FROM node:16

ENV DEBUG=todo-express-backend:*
ENV NODE_ENV production
ENV PORT 3000

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app/

RUN npm ci --only=production

USER node

CMD npm start