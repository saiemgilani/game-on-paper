FROM node:stretch-slim as base
WORKDIR /root/src

COPY ./package.json ./package.json

# install node packages
FROM base AS nodebuilder
RUN yarn install
 
FROM base
WORKDIR /code

COPY --from=nodebuilder /root/src/node_modules ./node_modules

COPY . .

RUN yarn build
CMD yarn start