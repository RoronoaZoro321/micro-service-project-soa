FROM node:20-alpine

WORKDIR /opt/program

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run" , "start:prod" ]