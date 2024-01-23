const fs = require('fs');
const path = require('path');
const carsFilePath = path.join(__dirname, "../data/cars.json");
let price = 0;
const {clientController, loggedIn, client} = require('../controllers/clientController');

const rentalController = {

    getDonePage: (req, res) => {
        res.render('donePage.ejs', {price});
    },

    getRentalPage: (req, res) => {
        const id = req.params.id;
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
        const car = cars.find((p) => p.CarID === parseInt(id));
        res.render('rentalPage.ejs', {car});
    },

    dealDone: (req, res) => {
        const x = parseInt(req.body.costPerDay);
        const startDate = Date.parse(req.body.start);
        const endDate = Date.parse(req.body.end);
    
        if (isNaN(startDate) || isNaN(endDate)) {
            return res.redirect('/cars?error=InvalidDate');
        }

        if(!loggedIn){
            return res.redirect('/cars?error=NotLoggedIn');
        }
    
        var timeDiff = Math.abs(endDate - startDate);
        var daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        price = x * daysDiff;
    
        res.redirect('/rentals/done');
    }
    
}

module.exports = rentalController;