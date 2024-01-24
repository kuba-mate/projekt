const fs = require('fs');
const path = require('path');
const carsFilePath = path.join(__dirname, "../data/cars.json");
const rentalsFilePath = path.join(__dirname, "../data/rentals.json");
let price = 0;
const {clientController} = require('../controllers/clientController');
let car = null;
const rentalController = {

    getDonePage: (req, res) => {
        res.render('donePage.ejs', {price});
    },

    getRentalPage: (req, res) => {
        const id = req.params.id;
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
        car = cars.find((p) => p.CarID === parseInt(id));
        res.render('rentalPage.ejs', {car});
    },

    dealDone: (req, res) => {
        const x = parseInt(req.body.costPerDay);
        const startDate = Date.parse(req.body.start);
        const endDate = Date.parse(req.body.end);
        const rentals = JSON.parse(fs.readFileSync(rentalsFilePath, "utf-8"));
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
        const filterCars = cars.filter((p) => p.CarID === car.CarID);

        if (isNaN(startDate) || isNaN(endDate) || startDate > endDate) {
            return res.redirect('/cars?error=InvalidDate');
        }

        let loggedIn = clientController.getLoggedIn();
        let client = clientController.getClient();

        if(!loggedIn){
            return res.redirect('/cars?error=NotLoggedIn');
        }

        console.log(filterCars.length);
        filterCars.forEach(x=>{
            console.log(x.RentalID)
            console.log(x.RentalEndDate)
        })

        let licznik = 0;
        filterCars.forEach(x => {
            console.log('x');
            if(!validateDate(startDate, endDate, x.RentalStartDate, x.RentalEndDate)){
                console.log('z');
                licznik++;
            }
        });

        if(licznik>0){
            console.log('y');
            return res.redirect('/cars?error=DateAlreadyTaken');
        }
    
        var timeDiff = Math.abs(endDate - startDate);
        var daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        price = x * daysDiff;
    
        const newRental = {RentalID: rentals.length + 1, CarID: car.CarID, CustomerID: client.CustomerID, RentalStartDate: req.body.start, RentalEndDate: req.body.end};
        rentals.push(newRental);
        fs.writeFileSync(rentalsFilePath, JSON.stringify(rentals, null, 2));
        res.redirect('/rentals/done');
    }
    
}

function validateDate(okres1Start, okres1End, okres2Start, okres2End) {
    if(okres2Start === undefined){
        return true;
    }
    return (okres1End < okres2Start) || (okres1Start > okres2End)
}

module.exports = rentalController;