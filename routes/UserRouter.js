const express = require("express");
const router = express.Router();

const UserContoller = require('../controllers/UserCtrl');
const userValidator = require('../validators/UserValidator');

router.post('/register',userValidator, UserContoller.register);
router.post('/login',UserContoller.logIn);

module.exports = router;