const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlumnoSchema = new Schema({
    apellido: { type: String, required: true },
    nombres: { type: String, required: true },
    dni: { type: Number, required: true },
    fechaNacimiento: { type: String, required: true },
    celular: { type: Number, required: true },
    domicilio: { type: String, required: true },
    email: { type: String, required: true },
    fechaInicio: { type: String, required: true },
    plan: { type: String, required: true },
    cuotas: { type: [Schema.Types.ObjectId], ref: 'Cuota', required: false },
    asistencias: { type: [Schema.Types.ObjectId], ref: 'Asistencia', required: false },
    rutinas: { type: [Schema.Types.ObjectId], ref: 'Rutina', required: false }
})

module.exports = mongoose.models.Alumno || mongoose.model('Alumno', AlumnoSchema);