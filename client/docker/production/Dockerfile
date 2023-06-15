ARG NODE_VERSION=18-alpine

FROM node:${NODE_VERSION} as node

FROM node as build-stage

WORKDIR /app

COPY ./package*.json .

RUN npm install -g pnpm && pnpm install 

COPY ./ /app/

RUN pnpm build

FROM nginx:1.21.3-alpine

COPY --from=build-stage /app/build/ /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
