FROM node:alpine

WORKDIR /opt/program

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3004

CMD [ "npm", "run", "start:prod" ]