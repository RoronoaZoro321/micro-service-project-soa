const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION (API-GATEWAY)! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: "../configs/config.env" });

const app = require("./api-gateway");

const PORT = process.env.ESB_PORT || 8000;
app.listen(PORT, () => {
    console.log(`API-GATEWAY running on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLER REJECTION (API-GATEWAY)! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
