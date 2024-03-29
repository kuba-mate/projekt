const fs = require('fs');
const path = require('path');
const clientsFilePath = path.join(__dirname, "../data/customers.json");
const loginsFilePath = path.join(__dirname, "../data/logins.json");
const carsFilePath = path.join(__dirname, "../data/cars.json");
const rentalsFilePath = path.join(__dirname, "../data/rentals.json");
let loggedIn= null;
let client = null;

const clientController = {

    getLoggedIn: () => {
        return loggedIn;
    },

    getClient: () => {
        return client;
    },
    
    getMainPage: (req, res) => {
        const cars = JSON.parse(fs.readFileSync(carsFilePath, "utf-8"));
        const car1 = cars.find((p) => p.CarID === parseInt(1));
        const car2 = cars.find((p) => p.CarID === parseInt(2));
        const newCar = [car1, car2];
        res.render('mainPage', { cars: newCar, loggedIn });
    },

    getAccountPage: (req, res) => {
        res.render('accountPage.ejs', {client});
    },

    getRegisterPage: (req, res) => {
        const error = '';
        res.render('registerPage', {error});
    },

    getLoginPage: (req, res) => {
        res.render('loginPage');
    },

    getAddRegisterUser: (req, res) => {
        const name = req.body.Name;
        const phone = req.body.Phone;
        const address = req.body.Address;
        const login = req.body.username;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const customers = JSON.parse(fs.readFileSync(clientsFilePath, "utf-8"));
        const logins = JSON.parse(fs.readFileSync(loginsFilePath, "utf-8"));
    
        // Walidacja: Czy wszystkie pola są wypełnione
        if (!name || !phone || !address || !login || !password || !confirmPassword) {
            const error = 'Wszystkie pola są wymagane.';
            return res.render('registerPage', { error });
        }

        // Walidacja: Czy hasło i potwierdzenie hasła są takie same
        if (password !== confirmPassword) {
            const error = 'Hasło i potwierdzenie hasła muszą być identyczne.';
            return res.render('registerPage', { error });
        }

        // Walidacja: Czy nazwa użytkownika jest już zajęta
        const existingUser = logins.find((user) => user.Login === login);
        if (existingUser) {
            const error = 'Podana nazwa użytkownika jest już zajęta.';
            return res.render('registerPage', { error });
        }

        // Walidacja: Czy numer telefonu jest już w bazie
        const existingPhone = customers.find((customer) => customer.Phone === phone);
        if (existingPhone) {
            const error = 'Podany numer telefonu jest już przypisany do innego konta.';
            return res.render('registerPage', { error });
        }
    
        const newCustomer = { CustomerID: customers.length + 1, Name: name, Phone: phone, Address: address, LoginID: customers.length + 1 };
        const newLogin = { LoginID: customers.length + 1, Login: login, Password: password };
        customers.push(newCustomer);
        logins.push(newLogin);
        fs.writeFileSync(clientsFilePath, JSON.stringify(customers, null, 2));
        fs.writeFileSync(loginsFilePath, JSON.stringify(logins, null, 2));
        res.redirect('/');
    },

    checkLogin: (req, res) => {
        const { username, password } = req.body;
        const logins = JSON.parse(fs.readFileSync(loginsFilePath, "utf-8"));
        const customers = JSON.parse(fs.readFileSync(clientsFilePath, "utf-8"));
        const user = logins.find((user) => user.Login === username);
    
        if (user && user.Password === password) {
            loggedIn = true;
            client = customers.find((x) => x.LoginID === user.LoginID);
            res.redirect('/');
        } else {
            res.render('loginPage', { error: 'Invalid username or password' });
        }      
    },

    getClientRentalPage: (req, res) => {
        const id = req.params.id;
        const rentals = JSON.parse(fs.readFileSync(rentalsFilePath, "utf-8"));
        const customersRentals = rentals.filter((a) => a.CustomerID === parseInt(id));
        res.render('clientRentalsPage.ejs', {customersRentals});
    }
};

module.exports = {clientController};
