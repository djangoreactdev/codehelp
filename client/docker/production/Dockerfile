ARG NODE_VERSION=18-alpine

FROM node:${NODE_VERSION} as node

FROM node as client-local-build

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

COPY ./package*.json .

RUN npm install -g pnpm && pnpm install 

RUN pnpm build

FROM nginx:1.21.3-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY ./build /usr/share/nginx/html

# COPY . ${APP_HOME}

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
