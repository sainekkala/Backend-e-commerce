const express = require('express');
const router = express.Router();

const reviewValidator = require('../validators/reviewValidator');

const userTokenValidator = require('../middlewares/UserToken.middleware');

const reviewCtrl = require('../controllers/reviewCtrl');

router.post('/',reviewValidator,userTokenValidator, reviewCtrl.add);

module.exports = router;