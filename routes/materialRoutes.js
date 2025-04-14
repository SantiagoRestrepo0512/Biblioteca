// routes/materialRoutes.js
const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// Obtener todos los materiales
router.get('/', materialController.obtenerMateriales);

// Registrar un nuevo material
router.post('/', materialController.crearMaterial);

// Eliminar un material por ID
router.delete('/:id', materialController.eliminarMaterial);

// Incrementar cantidad de un material específico
router.put('/incrementar/:id', materialController.incrementarCantidad);

module.exports = router;
