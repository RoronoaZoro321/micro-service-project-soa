FROM node:22-alpine

# Install Ganache CLI
RUN npm install -g ganache

WORKDIR /opt/program

COPY package.json .
RUN npm install

COPY . .

EXPOSE 8545 4000

# CMD [ "npm", "run", "start:prod" ]

# Start Ganache and the Express server
CMD ["sh", "-c", "ganache --host 0.0.0.0 & npm run start:prod"]

