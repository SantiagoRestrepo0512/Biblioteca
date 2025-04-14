// routes/personaRoutes.js
const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

// Obtener todas las personas
router.get('/', personaController.obtenerPersonas);

// Registrar una nueva persona
router.post('/', personaController.crearPersona);

// Eliminar una persona por cédula
router.delete('/eliminar/:cedula', personaController.eliminarPersona);

module.exports = router;