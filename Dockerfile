
FROM node:lts-alpine

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

RUN apk add libtool autoconf automake gcc build-base python3

COPY package.json yarn.* ./
COPY prisma ./

RUN apk add --no-cache git

RUN npx prisma generate

COPY . /home/node/app/

RUN chown -R node:node /home/node

RUN yarn

RUN yarn build

USER node

EXPOSE 3333

ENTRYPOINT ["node","build/server.js"]
