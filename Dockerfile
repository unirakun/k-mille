# build front
FROM node:9-alpine as builder
ARG app

WORKDIR /usr/src/app

COPY ui/ui-$app/package.json yarn.lock ./
RUN yarn install

COPY ui/ui-$app/ .
RUN yarn build

# production
FROM node:9-alpine
ARG app
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY packages/ ./packages
COPY api/api-$app/package.json ./api/api-$app/
RUN yarn install --production

COPY api/api-$app ./api/api-$app

WORKDIR /usr/src/app/api/api-$app
COPY --from=builder /usr/src/app/build ./build

ENTRYPOINT ["node", "--harmony", "src/index.js"]
