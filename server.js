const express = require('express');
const app = express();
const carRoutes = require('./routes/carRoutes');
const clientRoutes = require('./routes/clientRoutes');
const rentalRoutes = require('./routes/rentalsRoutes');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRoutes);
app.use('/', clientRoutes);
app.use('/rentals', rentalRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});