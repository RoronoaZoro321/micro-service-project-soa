const express = require('express');
const topupController = require('../controllers/controller');

const router = express.Router();

router
	.route('/')
	.get(topupController.getAllTopup)
	.post(topupController.createTopup)
	.put(topupController.topup);

module.exports = router;
