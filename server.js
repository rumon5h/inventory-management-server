const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = require('./app');



// Database connection 

mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Successfully connected the database!');
})

// Server

const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})