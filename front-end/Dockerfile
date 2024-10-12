FROM node:20-alpine

WORKDIR /opt/program

COPY package.json /opt/program

RUN npm install

RUN npm i -g serve

COPY . /opt/program

RUN npm run build

CMD [ "serve", "-s", "dist", "-l", "8000" ]
