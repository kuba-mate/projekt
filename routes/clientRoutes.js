const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.getMainPage);
router.get('/register', clientController.getRegisterPage);
router.post('/register', clientController.getAddRegisterUser)
router.get('/login', clientController.getLoginPage);
router.post('/login', clientController.checkLogin);
router.get('/account', clientController.getAccountPage)


module.exports = router;