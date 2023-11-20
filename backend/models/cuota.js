const mongoose = require('mongoose');
const { Schema } = mongoose;

const CuotaSchema = new Schema({
    monto: { type: Number, required: true },
    fechaPago: { type: String, required: true },
    modoPago: { type: String, required: true },
    // alumno: { type: Schema.Types.ObjectId, ref: 'Alumno', required: true }
    idAlumno: { type: String, required: true }
})

module.exports = mongoose.models.Cuota || mongoose.model('Cuota', CuotaSchema);