FROM node:20.5-buster

ARG COMMIT_HASH
ENV COMMIT_HASH=${COMMIT_HASH}
ARG PORT
ENV PORT=${PORT:-8080}

WORKDIR /mock-pfis

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src
RUN npm run compile

EXPOSE ${PORT}
ENTRYPOINT ["node", "dist/main.js"]