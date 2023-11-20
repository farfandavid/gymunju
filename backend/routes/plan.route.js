const planCtrl = require ('./../controllers/plan.controller');

const express = require('express');
const router = express.Router();

router.get('/', planCtrl.getPlanes);
router.post('/', planCtrl.createPlan);
router.put('/:id', planCtrl.editPlan);
router.delete('/:id', planCtrl.deletePlan);

module.exports = router;