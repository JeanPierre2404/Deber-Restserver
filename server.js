///////
require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//////////////////////////////// parse aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/usuario', (req, res) => {
    /** CONSULTAR REGISTROS */
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    /** CREAR NUEVOS REGISTRO */
    res.json('post Usuario');
});

app.put('/usuario/:id', (req, res) => {
    /** ACTUALIZAR REGISTROS */
    //res.json('put Usuario');
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(404), json({
            mensaje: 'El nombre es necesario'
        });
    } else {
        res.json({
            persona: body
        });
    }

});

app.delete('/usuario', (req, res) => {
    /** ELIMINAR REGISTRO (CAMBIAR A INACTIVO) */
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
});