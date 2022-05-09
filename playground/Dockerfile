FROM node:16
# RUN apk dumb-init

ENV DEBUG=playground:*
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app/

# use npm ci instead of npm install for installing depencencies
# install may update the package-lock.json
# install may install a different version of a dependency if you have ^ or ~ in the version of the dependency.
# ci will delete the node_modules folder before installing anything
# ci will follow the package-lock.json and does not alter any files
# npm ci --only=production to not waste time installing development dependencies

RUN npm ci --only=production

USER node

# CMD ["dumb-init", "node", "./bin/www"]
CMD npm start