//Importar el modulo de express
const express = require('express');
//Crear el objeto app
const app = express();


//Configurar los endpoint para usuarios
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
        res.status(400), json({
            mensaje: "El nombre es necesario"
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

//exportar para que se pueda utilizar otros modulos.
module.exports = app;