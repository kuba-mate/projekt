const express = require('express');
const router = express.Router();
const {clientController, loggedIn, client} = require('../controllers/clientController');

router.get('/', clientController.getMainPage);
router.get('/register', clientController.getRegisterPage);
router.post('/register', clientController.getAddRegisterUser)
router.get('/login', clientController.getLoginPage);
router.post('/login', clientController.checkLogin);
router.get('/account', clientController.getAccountPage);
router.get('/account/:id', clientController.getClientRentalPage);


module.exports = router;