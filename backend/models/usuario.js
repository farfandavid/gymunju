const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    tipo: { type: Number, required: true }, // Administrador = 0 | Usuario = 1
    alumno: { type: Schema.Types.ObjectId, ref: 'Alumno', required: false }
})

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema)