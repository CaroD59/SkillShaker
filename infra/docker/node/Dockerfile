ARG NODE_VERSION=20.0.0-alpine3.17

## BUILD ASSETS
FROM node:${NODE_VERSION} as builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
 
# Expose the port the app runs in
EXPOSE 3000

RUN npm run build

FROM builder as dev
CMD ["npm", "run", "dev"]

FROM builder as prod
CMD ["npm", "run", "build"]
