const mongoose = require("../db");

const topupSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Please provide a code"],
        unique: [true, "Code already exists"],
    },
    usedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
    },
    amount: {
        type: Number,
        required: [true, "Please provide the amount"],
        min: [1, "Amount cannot be negative or zero"],
    },
    isUsed: {
        type: Boolean,
        default: false,
    },
    usedAt: {
        type: Date
    }
});

const Topup = mongoose.model("Topup", topupSchema);

module.exports = Topup;
