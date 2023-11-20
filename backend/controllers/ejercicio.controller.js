const Ejercicio = require('../models/ejercicio');
const ejercicioCtrl = {}

ejercicioCtrl.getEjercicios = async (req, res) => {
    var ejercicios = await Ejercicio.find();
    res.json(ejercicios);
}

ejercicioCtrl.getEjercicio = async (req, res) => {
    const ejercicio = await Ejercicio.findById(req.params.id);
    res.json(ejercicio);
}

ejercicioCtrl.createEjercicio = async (req, res) => {
    var ejercicio = new Ejercicio(req.body);
    try {
        await ejercicio.save();
        res.json({
            'status': '1',
            'msg': 'Ejercicio guardado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

ejercicioCtrl.editEjercicio = async (req, res) => {
    const vejercicio = new Ejercicio(req.body);
    try {
        await Ejercicio.updateOne({_id: req.body._id}, vejercicio);
        res.json({
            'status': '1',
            'msg': 'Ejercicio actualizado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

ejercicioCtrl.deleteEjercicio = async (req, res) => {
    try {
        await Ejercicio.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Ejercicio borrado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = ejercicioCtrl;