const Plan = require('../models/plan');
const planCtrl = {}

planCtrl.getPlanes = async (req, res) => {
    var plans = await Plan.find();
    res.json(plans);
}

planCtrl.createPlan = async (req, res) => {
    var plan = new Plan(req.body);
    try {
        await plan.save();
        res.json({
            'status': '1',
            'msg': 'Plan guardado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

planCtrl.editPlan = async (req, res) => {
    const vplan = new Plan(req.body);
    try {
        await Plan.updateOne({_id: req.body._id}, vplan);
        res.json({
            'status': '1',
            'msg': 'Plan actualizado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

planCtrl.deletePlan = async (req, res) => {
    try {
        await Plan.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Plan borrado'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = planCtrl;