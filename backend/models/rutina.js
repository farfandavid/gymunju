const mongoose = require('mongoose');
const { Schema } = mongoose;

const RutinaSchema = new Schema({
    nombre: { type: String, required: true },
    ejercicios: [{ type: Schema.Types.ObjectId, ref: 'Ejercicio', required: false }],
    idAlumno: { type: String, required: true }
})

module.exports = mongoose.models.Rutina || mongoose.model('Rutina', RutinaSchema);