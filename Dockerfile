FROM node:18.1.0-alpine3.14

RUN yarn install -g @nestjs/cli@8.0.0

user node 

WORKDIR /home/node/app