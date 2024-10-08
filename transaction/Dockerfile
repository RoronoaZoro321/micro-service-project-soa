FROM node:alpine

WORKDIR /opt/program

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3003

ENTRYPOINT [ "npm", "start" ]