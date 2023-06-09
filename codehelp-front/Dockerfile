# FROM node:18-alpine AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# COPY package.json package-lock.json ./
# RUN  yarn install 

# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

# RUN yarn build

# FROM node:18-alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN chmod -R 755 /app && addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 reactjs 

# # COPY --from=builder --chown=reactjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# USER reactjs

# EXPOSE 3000

# ENV PORT 3000

# CMD ["yarn", "start"]

FROM node:18-alpine as builder
# Set the working directory to /app inside the container
ARG REACT_APP_BASE_API
ENV REACT_APP_BASE_API ${REACT_APP_BASE_API:-http://codehelp-api:8000}
RUN touch .env && echo "REACT_APP_BASE_API=$REACT_APP_BASE_API" >> .env
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn install && yarn build
# # Build the app
# RUN yarn build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3000
# Start nginx
CMD ["nginx", "-g", "daemon off;"]