const express = require('express');
const topupController = require('../controllers/controller');

const router = express.Router();

router.route('/').patch(topupController.topup); // in -> esb
router.route('/createTopup').post(topupController.createTopup);
router.route('/topupAll').get(topupController.getAllTopup);

module.exports = router;
