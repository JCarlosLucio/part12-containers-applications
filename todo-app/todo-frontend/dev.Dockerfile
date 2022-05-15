FROM node:16 

WORKDIR /usr/src/app

COPY . .

# npm install instead of npm ci for development mode
RUN npm install

# npm start for development mode
CMD ["npm","start"]