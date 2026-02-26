FROM node:22-alpine

WORKDIR /opt/program

COPY package.json .
RUN npm install

COPY . .

EXPOSE 3006

CMD [ "npm", "run", "start:prod" ]

