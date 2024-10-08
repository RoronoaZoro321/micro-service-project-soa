FROM node:22-alpine3.19

WORKDIR /opt/program

RUN ls

COPY configs /opt/program/configs
COPY common /opt/program/common
COPY db /opt/program/db
COPY services/auth-service /opt/program/services/auth-service

WORKDIR /opt/program/services/auth-service

RUN npm install

ENTRYPOINT [ "npm", "start" ]