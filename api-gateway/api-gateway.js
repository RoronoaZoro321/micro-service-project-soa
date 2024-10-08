
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


const apiGatewayRouter = require("./routes/ApiGatewayRoutes");
const AppError = require("../common/utils/appError");
const globalErrorHandler = require("../common/controllers/errorController");

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Use the CORS middleware
app.use(
    cors({
        origin: "http://127.0.0.1:8000",
        credentials: true,
    })
);

// Serve Swagger documentation
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Limit requests from same API
// const limiter = rateLimit({
//     max: 1000,
//     windowMs: 60 * 60 * 10000,
//     message: "Too many requests from this IP, please try again in an hour!",
// });
// app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "100kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Serving static file
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// To parse JSON bodies
app.use(express.json());

// To parse cookies
app.use(cookieParser());

// 3) ROUTES
app.use("/api/v1/apiGateway", apiGatewayRouter);

// Handle undefined routes
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
