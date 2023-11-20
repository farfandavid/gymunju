const mongoose = require('mongoose');
const { Schema } = mongoose;

const EjercicioSchema = new Schema({
    nombre: { type: String, required: true },
    series: { type: Number, required: false },
    repeticiones: { type: Number, required: false },
    descanso: { type: String, required: false },
    notas: { type: String, required: false }
})

module.exports = mongoose.models.Ejercicio || mongoose.model('Ejercicio', EjercicioSchema);