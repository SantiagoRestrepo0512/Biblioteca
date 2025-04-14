const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimientoController');

router.get('/', movimientoController.obtenerMovimientos);
router.post('/prestamo', movimientoController.registrarPrestamo);
router.post('/devolucion', movimientoController.registrarDevolucion);

module.exports = router;
