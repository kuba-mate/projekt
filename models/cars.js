class Car{
    constructor(CarID, Model, Year, Color, RentalStatus, CostPerDay){
        this.CarID = CarID;
        this.Model = Model;
        this.Year = Year;
        this.Color = Color;
        this.RentalStatus = RentalStatus;
        this.CostPerDay = CostPerDay;
    }
}

module.exports = Car;