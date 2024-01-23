const fs = require('fs');
const path = require('path');
const carsFilePath = path.join(__dirname, "../data/cars.json");

const carController = {

    getAllCars: (req, res) => {
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
        res.render('carsList', { cars: cars });
    },

    getCarDetails: (req, res) => {
        const CarID = req.params.id;
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
        const car = cars.find((p) => p.CarID === parseInt(CarID));
        res.render('carsDetails', {car})
    }
}

module.exports = carController;