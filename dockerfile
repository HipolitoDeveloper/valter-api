FROM node:16

RUN mkdir -p /usr/valter_api

COPY package.json /usr/valter_api/package.json

WORKDIR /usr/valter_api

RUN npm install

RUN rm -rf /usr/valter_api

COPY . .

# RUN npm run build

EXPOSE 9000

CMD npm start
