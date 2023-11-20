const Asistencia = require('../models/asistencia');
const asistenciaCtrl = {}

asistenciaCtrl.getAsistencias = async (req, res) => {
    var asistencias = await Asistencia.find();
    res.json(asistencias);
}

asistenciaCtrl.getAsistencia = async (req, res) => {
    const asistencia = await Asistencia.findById(req.params.id);
    res.json(asistencia);
}

asistenciaCtrl.getAsistenciasDeAlumno = async (req, res) => {
    var asistencias = await Asistencia.find({ idAlumno: req.params.idAlumno });
    res.json(asistencias);
}

asistenciaCtrl.createAsistencia = async (req, res) => {
    var asistencia = new Asistencia(req.body);
    try {
        await asistencia.save();
        res.json({
            'status': '1',
            'msg': 'Asistencia guardada'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

asistenciaCtrl.editAsistencia = async (req, res) => {
    const vasistencia = new Asistencia(req.body);
    try {
        await Asistencia.updateOne({_id: req.body._id}, vasistencia);
        res.json({
            'status': '1',
            'msg': 'Asistencia actualizada'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

asistenciaCtrl.deleteAsistencia = async (req, res) => {
    try {
        await Asistencia.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Asistencia borrada'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = asistenciaCtrl;