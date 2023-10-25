const express = require('express');
const router = express.Router();

const ProductCtrl = require("../controllers/ProductCtrl");
const ProductValidator = require('../validators/ProductValidator');
const userTokenValidator = require('../middlewares/UserToken.middleware');

router.get('/pagination', ProductCtrl.pagination);
router.get('/', ProductCtrl.getAll);
router.get('/:id',ProductCtrl.getById);
router.post('/',ProductValidator,userTokenValidator, ProductCtrl.add);
router.put("/:id", ProductCtrl.update);
router.delete('/:id', ProductCtrl.delete);
router.patch('/:id', ProductCtrl.patch);

module.exports = router;