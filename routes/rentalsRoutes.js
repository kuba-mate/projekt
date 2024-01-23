const express = require('express');
const router = express.Router();
const clientController = require('../controllers/rentalController');
const rentalController = require('../controllers/rentalController');

router.get('/done', rentalController.getDonePage);
router.get('/:id', rentalController.getRentalPage);
router.post('/:id', rentalController.dealDone);


module.exports = router;