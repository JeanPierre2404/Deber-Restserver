///////
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');



//////////////////////////////// parse aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

////PARSE APPLICATION/JSON
app.use(bodyParser.json())

//Endpoints
app.use(require('./server/routes/usuario'));

/*CONEXION CON BDD*/
mongoose.connect('mongodb://localhost:27017', (err, res) => {
    if (err) {
        throw err;
    }
    console.log("Base de datos ON LINE");
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
});