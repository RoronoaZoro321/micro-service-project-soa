FROM node:alpine

WORKDIR /opt/program

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

ENTRYPOINT [ "npm", "start" ]