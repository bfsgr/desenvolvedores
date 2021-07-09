FROM node:alpine

WORKDIR /user/typescript-app/server
COPY server/package.json .

WORKDIR /user/typescript-app/client
COPY client/package.json .

# Install dependencies and build client
RUN yarn
COPY client/ ./
RUN yarn build

# Install dependencies and build server
WORKDIR /user/typescript-app/server
RUN yarn
COPY server/ ./
RUN yarn build

#Unit test server
WORKDIR /user/typescript-app/server/dist
RUN yarn jest --testPathPattern=test/unit

WORKDIR /user/typescript-app/server/dist/public
RUN mv /user/typescript-app/client/build/* .

EXPOSE 5000

WORKDIR /user/typescript-app/server/dist
RUN yarn global add ts-node
ENV NODE_ENV "production"
CMD yarn typeorm migration:run -t false && node src/index.js





