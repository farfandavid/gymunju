const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlanSchema = new Schema({
    nombre: { type: String, required: true },
    rutinas: { type: [Schema.Types.ObjectId], ref: 'Rutina', required: true }
})

module.exports = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);