const express = require('express');
const User = require('../model/Model')
const router = express.Router();
const UserContrller = require('../controllers/Controller')

router.get('/', UserContrller.getAllUsers);
router.post('/', UserContrller.addUser);
router.get('/:id', UserContrller.getById);
router.put('/:id', UserContrller.updateUser);
router.delete('/:id', UserContrller.deleteUser);

module.exports = router;
