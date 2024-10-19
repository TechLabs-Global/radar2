FROM node:22-alpine AS build

WORKDIR /build

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Runtime dependencies
FROM node:22-alpine AS dependencies

WORKDIR /dependencies

COPY package.json ./
COPY --from=build /build/package-lock.json ./
RUN npm ci --omit=dev

# Runtime image
FROM gcr.io/distroless/nodejs22-debian12 AS runtime

WORKDIR /app

ENV NODE_ENV production

COPY --from=dependencies /dependencies/node_modules ./node_modules

COPY --from=build /build/build ./build
COPY --from=build /build/package.json ./package.json

CMD ["node", "build/index.js"]
