FROM node:8-alpine
WORKDIR /usr/src/app
RUN apk add yarn curl bash wget
COPY package.json yarn.lock ./
RUN yarn
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
RUN node-prune
COPY . .
RUN yarn build
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]