FROM node:22-alpine

WORKDIR /opt/program

COPY package.json .
RUN npm install

COPY . .

EXPOSE 4001

CMD [ "npm", "run", "start:prod" ]

