const Alumno = require('../models/alumno');
const Cuota = require('../models/cuota');
const alumnoCtrl = {}

alumnoCtrl.getAlumnos = async (req, res) => {
    var alumnos = await Alumno.find()
        .populate('cuotas')
        .populate('asistencias')
        .populate({
            path: 'rutinas',
            populate: {
                path: 'ejercicios'
            }
        });
    res.json(alumnos);
}
alumnoCtrl.getAlumno = async (req, res) => {
    const alumno = await Alumno.findById(req.params.id);
    res.json(alumno);
}

alumnoCtrl.getAlumnosBusquedaDni = async (req, res) => {
    const alumno = await Alumno.find({ dni: req.params.search })
        .populate('cuotas')
        .populate('asistencias')
        .populate('rutinas');
    res.json(alumno);
}
alumnoCtrl.createAlumno = async (req, res) => {
    var alumno = new Alumno(req.body);
    try {
        await alumno.save();
        res.json({
            'status': '1',
            'msg': 'Alumno guardado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

alumnoCtrl.editAlumno = async (req, res) => {
    const valumno = new Alumno(req.body);
    try {
        await Alumno.updateOne({ _id: req.body._id }, valumno);
        res.json({
            'status': '1',
            'msg': 'Alumno actualizado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

alumnoCtrl.deleteAlumno = async (req, res) => {
    try {
        await Alumno.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Alumno borrado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}


alumnoCtrl.insertCuota = async (req, res) => {
    const cuota = new Cuota(req.body);
    const alumno = await Alumno.findById(req.params.id);
    alumno.cuotas.push(cuota);
    try {
        await Alumno.updateOne({ _id: req.params.id }, alumno);
        res.json({
            'status': '1',
            'msg': 'Pago registrado.'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }

}

module.exports = alumnoCtrl;