const fs = require('fs');
const path = require('path');
const clientsFilePath = path.join(__dirname, "../data/customers.json");
const loginsFilePath = path.join(__dirname, "../data/logins.json");
const carsFilePath = path.join(__dirname, "../data/cars.json");
let loggedIn = null;

const clientController = {

    getMainPage: (req, res) => {
        if(loggedIn != true){
            loggedIn = false;
        }
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
        const car1 = cars.find((p) => p.CarID === parseInt(1));
        const car2 = cars.find((p) => p.CarID === parseInt(2));
        const newCar = [car1, car2];
        res.render('mainPage', { cars: newCar, loggedIn });
    },

    getAccountPage: (req, res) => {
        res.render('accountPage.ejs');
    },

    getRegisterPage: (req, res) => {
        res.render('registerPage');
    },

    getLoginPage: (req, res) => {
        res.render('loginPage');
    },

    getAddRegisterUser: (req, res) => {
        const name = req.body.Name;
        const phone = req.body.Phone;
        const address = req.body.Address;
        const login = req.body.username;
        const password = req.body.password
        const customers = JSON.parse(fs.readFileSync(clientsFilePath, "utf-8")); 
        const logins = JSON.parse(fs.readFileSync(loginsFilePath, "utf-8"));
        const newCustomer = { CustomerID: customers.length + 1, Name: name, Phone: phone, Address: address, LoginID: customers.length + 1 };
        const newLogin = { LoginID: customers.length + 1, Login: login, Password: password};
        customers.push(newCustomer);
        logins.push(newLogin);
        fs.writeFileSync(clientsFilePath, JSON.stringify(customers, null, 2));
        fs.writeFileSync(loginsFilePath, JSON.stringify(logins, null, 2));
        res.redirect('/');
    },

    checkLogin: (req, res) => {
        const { username, password } = req.body;
        const logins = JSON.parse(fs.readFileSync(loginsFilePath, "utf-8"));
        const user = logins.find((user) => user.Login === username);

        if (user && user.Password === password) {
            loggedIn = true;
            client = user;
            res.redirect('/');
        } else {
            res.render('loginPage', { error: 'Invalid username or password' });
        }
    }
};

module.exports = clientController;
