//Importar el modulo de express
const express = require('express');
//Importar la libreria para importar 
const bcrypt = require('bcrypt');
//Importar el Shema del usuario
const Usuario = require('../models/usuario')
    //importar undescore
const _ = require('underscore');
//Crear el objeto app
const app = express();


//Configurar los endpoint para usuarios
app.get('/usuario', (req, res) => {
    /** CONSULTAR REGISTROS */
    //res.json('get Usuario');
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    usuarios
                });
            });

        });
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
    let id = rew.params.id;
    /** ACTUALIZAR REGISTROS */
    //res.json('put Usuario');
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    });
    res.json({
        ok: true,
        usuario: usuarioDB
    });
    /*if (body.nombre === undefined) {
        res.status(400), json({
            mensaje: "El nombre es necesario"
        });
    } else {
        res.json({
            persona: body
        });
    }*/

});

app.delete('/usuario', (req, res) => {
    /** ELIMINAR REGISTRO (CAMBIAR A INACTIVO) */
    res.json('delete Usuario');
});

//exportar para que se pueda utilizar otros modulos.
module.exports = app;