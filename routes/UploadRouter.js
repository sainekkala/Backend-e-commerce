const express = require('express');
const router = express.Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, './uploads');
    },
    filename : (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({storage:storage});

const uploadCtrl = require('../controllers/uploadCtrl');

router.post("/",upload.single('image'), uploadCtrl.sendFileName);

module.exports = router;