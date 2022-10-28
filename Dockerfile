FROM node:18.1.0-alpine3.14

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .



RUN yarn 

COPY . .

CMD ["yarn", "start:dev"]