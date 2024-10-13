const express = require('express');
const transactionController = require('../controllers/controller');

const router = express.Router();

router.post('/transfer', transactionController.transfer);

module.exports = router;
