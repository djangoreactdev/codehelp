ARG NODE_VERSION=18-alpine

FROM node:${NODE_VERSION} as node

FROM node as client-local-build

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY ./package*.json .

RUN npm install -g pnpm && pnpm install

COPY . ${APP_HOME}

CMD ["pnpm","start"]
