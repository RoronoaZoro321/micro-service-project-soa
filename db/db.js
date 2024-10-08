const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../configs/config.env" });

const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.error("DB connection error:", err));

module.exports = mongoose;
