const express = require('express');
const router = express.Router();

const cartController = require('../controllers/CartCtrl');
const userTokenValidator = require('../middlewares/UserToken.middleware');


router.post('/',userTokenValidator, cartController.create);
router.get('/:userId',userTokenValidator, cartController.getByUserId);

module.exports = router;