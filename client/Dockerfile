FROM node:18.1.0-alpine3.14

WORKDIR /usr/src/app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN yarn

ENTRYPOINT ["/entrypoint.sh"]

CMD ["yarn", "dev"]