class Rental{
    constructor(RentalID, CarID, CustomerID, RentalStartDate, RentalEndDate){
        this.RentalID = RentalID;
        this.CarID = CarID;
        this.CustomerID = CustomerID;
        this.RentalStartDate = Date.parse(RentalStartDate);
        this.RentalEndDate = Date.parse(RentalEndDate);
    }
}

module.exports = Rental;