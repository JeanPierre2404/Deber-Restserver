//Importar modulo express
const express = require('express');
//Importar la libreria para encriptar
const bcrypt = require('bcrypt');
//Importar el Schema de usuario
const Usuario = require('../models/usuario');
//importar underscore
const _ = require('underscore');
//crear el objeto app
const app = express();

app.get('/usuario', (req, res) => {
    //consultar registros

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Usuario.find({}, 'nombre email role estado')
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
                })
            });


        });
});

//crear nuevos registros
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

        usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', (req, res) => {
    //actualizar registros
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                of: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });
});

app.delete('/usuario/:id', (req, res) => {
    //eliminar registros (cambiar a inactivo)
    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioBD) => {
        if (err) {
            return res.status(400).json({
                of: false,
                err
            });
        }

        if (usuarioBD == null) {
            return res.status(400).json({
                of: false,
                error: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        });
    });

    /*Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                of: false,
                err
            });
        }

        if (usuarioBorrado == null) {
            return res.status(400).json({
                of: false,
                error: {
                    message: "Usuario no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });*/
});

//exportar para que se pueda utilizar en otros modulos
module.exports = app;