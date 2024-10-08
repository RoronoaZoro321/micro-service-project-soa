# Project Structure

/microservices-system
├── /api-gateway              # API Gateway
│   ├── /src
│   │   ├── app.js            # API Gateway setup
│   │   └── routes.js         # Routes for the gateway
│   ├── Dockerfile            # Dockerfile for the API Gateway
│   └── package.json          # Dependencies for API Gateway
│
├── /services
│   ├── /auth                 # Auth service
│   ├── /transaction          # Transaction service
│   │   ├── /src
│   │   │   ├── controllers   # Business logic
│   │   │   ├── models        # MongoDB models
│   │   │   ├── routes        # API routes
│   │   │   ├── events        # Kafka event handling
│   │   │   ├── app.js        # Service entry point
│   │   ├── Dockerfile        # Dockerfile for Transaction service
│   │   └── package.json      # Dependencies for Transaction service
│   ├── /topup                # Topup service
│   └── /user                 # User service
│
├── /kafka
│   ├── /src
│   │   └── broker.js         # Kafka broker logic
│   └── Dockerfile            # Dockerfile for Kafka
│
├── /mongodb
│   └── Dockerfile            # Dockerfile for MongoDB
│
├── /event-repository          # Event store service (Kafka)
├── /docker-compose.yml        # Docker Compose file to orchestrate services
└── README.md


# to start the project dev mode no docker

to run auth-service
```
npm run start:auth-service
```
