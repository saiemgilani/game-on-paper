FROM node:stretch-slim
WORKDIR /src/app
COPY . .
RUN yarn
RUN yarn build
# EXPOSE 3000
CMD yarn start