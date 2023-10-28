const express = require("express");
const router = express.Router();

const UserContoller = require('../controllers/UserCtrl');
const userValidator = require('../validators/UserValidator');

router.post('/register',userValidator, UserContoller.register);
router.post('/login',UserContoller.logIn);
router.post("/sendmail", UserContoller.sendMail);
router.patch('/update', UserContoller.update);

module.exports = router;