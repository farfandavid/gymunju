const cuotaCtrl = require ('./../controllers/cuota.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.get('/', autCtrl.verifyToken, cuotaCtrl.getCuotas);
router.get('/:id', autCtrl.verifyToken, cuotaCtrl.getCuota);
router.post('/', autCtrl.verifyToken, cuotaCtrl.createCuota);
router.put('/:id', autCtrl.verifyToken, cuotaCtrl.editCuota);
router.delete('/:id', autCtrl.verifyToken, cuotaCtrl.deleteCuota);

router.get('/alumno/:idAlumno', autCtrl.verifyToken, cuotaCtrl.getCuotasDeAlumno);

module.exports = router;