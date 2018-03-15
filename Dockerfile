### BUILD FRONT
# invoices
FROM node:9-alpine AS invoices-builder
WORKDIR /usr/src/app
COPY ui/ui-invoices/package.json ui/ui-invoices/yarn.lock ./
RUN yarn install
COPY ui/ui-invoices/ .
RUN yarn build

FROM node:9-alpine AS kmille-invoices
WORKDIR /usr/src/app
COPY package.json lerna.json ./
COPY packages ./packages
COPY api/api-invoices ./api/api-invoices
RUN yarn install
COPY --from=invoices-builder /usr/src/app/build ./api/api-invoices/build
RUN node api/api-invoices/src/index.js
EXPOSE 3001
