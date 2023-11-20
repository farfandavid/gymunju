const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const usuarioCtrl = {}

usuarioCtrl.getUsuarios = async (req, res) => {
    var usuarios = await Usuario.find().populate("alumno").populate("cuotas").populate("asistencias").populate("rutinas");
    res.json(usuarios);
}

usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id).populate("alumno").populate("cuotas").populate("asistencias").populate("rutinas");
    res.json(usuario);
}

usuarioCtrl.getUsuarioUsername = async (req, res) => {
    const usuario = await Usuario.find({ username: req.params.search });
    res.json(usuario);
}
usuarioCtrl.getUsuarioAlumno = async (req, res) => {
    const usuario = await Usuario.find({ alumno: req.params.search });
    res.json(usuario);
}
usuarioCtrl.createUsuario = async (req, res) => {
    var usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.json({
            'status': '1',
            'msg': 'Usuario guardado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

usuarioCtrl.editUsuario = async (req, res) => {
    const vusuario = new Usuario(req.body);
    try {
        await Usuario.updateOne({ _id: req.body._id }, vusuario);
        res.json({
            'status': '1',
            'msg': 'Usuario actualizado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Usuario borrado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

usuarioCtrl.loginUsuario = async (req, res) => {
    const criteria = {
        username: req.body.username,
        password: req.body.password
    }
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    Usuario.findOne(criteria, function (err, user) {
        if (err) {
            res.json({
                status: 0,
                msg: 'error'
            })
        };
        if (!user) {
            res.json({
                status: 0,
                msg: "not found"
            })
        } else {
            //preparo un token para ser enviado en caso de loguin correcto
            const unToken = jwt.sign({ id: user._id }, "secretkey");
            res.json({
                status: 1,
                msg: "success",
                username: user.username,
                userid: user._id,
                tipo: user.tipo,
                token: unToken
            });
        }
    })
}

module.exports = usuarioCtrl;