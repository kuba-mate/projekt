const fs = require('fs');
const path = require('path');
const carsFilePath = path.join(__dirname, "../data/cars.json");
const PAGE_SIZE=2;

const carController = {

    getAllCars: (req, res) => {
        const page = req.query.page || 1;
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));

        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const paginatedCars = cars.slice(startIndex, endIndex);

        const totalPages = Math.ceil(cars.length / PAGE_SIZE);
        res.render('carsList', { cars: paginatedCars, currentPage: page, totalPages });
    },

    getCarDetails: (req, res) => {
        const CarID = req.params.id;
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
        const car = cars.find((p) => p.CarID === parseInt(CarID));
        res.render('carsDetails', {car})
    }
}

module.exports = carController;