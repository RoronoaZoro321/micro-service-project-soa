const mongoose = require("../db");

const transactionSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "Please provide the amount"],
        min: [1, "Amount cannot be negative or zero"],
    },
}, {
    timestamps: true,
});

// Add indexes
transactionSchema.index({ senderId: 1 });
transactionSchema.index({ receiverId: 1 });


// transactionSchema.pre("save", function (next) {
//     next();
// });

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
