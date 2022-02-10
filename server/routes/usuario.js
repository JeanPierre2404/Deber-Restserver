//Importar el modulo de express
const express = require('express');
//Importar la libreria para importar 
const bcrypt = require('bcrypt');
//Importar el Shema del usuario
const Usuario = require('../models/usuario')

//Crear el objeto app
const app = express();


//Configurar los endpoint para usuarios
app.get('/usuario', (req, res) => {
    /** CONSULTAR REGISTROS */
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        //usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
    /** CREAR NUEVOS REGISTRO */
    //res.json('post Usuario');
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