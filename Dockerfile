FROM node:stretch-slim
WORKDIR /src/app
COPY . .
RUN yarn
RUN yarn build
CMD yarn start