# build front
FROM node:9-alpine as builder
WORKDIR /usr/src/app
ARG app
COPY ui/ui-$app/package.json ./
RUN yarn install
COPY ui/ui-$app/ .
RUN yarn build

FROM node:9-alpine
WORKDIR /usr/src/app
COPY package.json lerna.json ./
COPY packages ./packages
ARG app
COPY api/api-$app ./api/api-$app
RUN yarn install
COPY --from=builder /usr/src/app/build ./api/api-$app/build
EXPOSE 3001