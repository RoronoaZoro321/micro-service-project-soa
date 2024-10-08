const express = require("express");
const gatewayAuthController = require("../controllers/gatewayAuthController");
// const gatewayUserController = require("../controllers/gatewayUserController");
// const gatewayTransactionController = require("../controllers/gatewayTrasactionController");
// const gatewayTopupController = require("../controllers/gatewayTopupController");
const protect = require("../middleware/protect");
const adminProtect = require("../middleware/adminProtect");

const router = express.Router();

router.post("/auth/signup", gatewayAuthController.signup);
router.post("/auth/login", gatewayAuthController.login);
router.get("/auth/logout", gatewayAuthController.logout);

// // User Service
// router.get("/users/getAllUsers", adminProtect, gatewayUserController.getAllUsers);
// router.get("/users/profile", protect, gatewayUserController.getProfile);
// router.post("/users/getUserById", protect, gatewayUserController.getUserById);
// router.patch("/users/updateMe", protect, gatewayUserController.updateMe);

// // User Service - Account
// router.post(
//     "/users/accounts/createAccount",
//     protect,
//     gatewayUserController.createAccount
// );
// router.get(
//     "/users/accounts/getAccountsByUserId",
//     protect,
//     gatewayUserController.getAccountsByUserId
// );
// router.post(
//     "/users/accounts/getAccountById",
//     protect,
//     gatewayUserController.getAccountById
// );
// router.post(
//     "/users/accounts/getAccountByAccountNumber",
//     protect,
//     gatewayUserController.getAccountByAccountNumber
// );
// router.delete(
//     "/users/accounts/deleteAccountById",
//     protect,
//     gatewayUserController.deleteAccountById
// );

// // Transaction Service
// router.post(
//     "/transaction/transfer",
//     protect,
//     gatewayTransactionController.transfer
// );
// router.post(
//     "/transaction/MyAccTransactions",
//     protect,
//     gatewayTransactionController.getAllTransactionsByAccountId
// );

// router.patch("/topup", protect, gatewayTopupController.topup);
// router.post("/topup/createTopup", adminProtect, gatewayTopupController.createTopup);
// router.get("/topup/getAllTopup", adminProtect, gatewayTopupController.getAllTopup);

module.exports = router;
