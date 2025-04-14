// controllers/personaController.js
const Persona = require('../models/personaModel');

// Obtener todas las personas
const obtenerPersonas = (req, res) => {
  Persona.obtenerPersonas()
    .then((personas) => {
      res.status(200).json(personas);
    })
    .catch((err) => {
      console.error('Error al obtener personas:', err);
      res.status(500).json({ mensaje: 'Error al obtener las personas', error: err.message });
    });
};

// Crear una nueva persona
const crearPersona= (req, res) => {
  const { cedula, nombre, rol } = req.body;

  if (!cedula || !nombre || !rol) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  Persona.crearPersona(cedula, nombre, rol)
    .then((resultado) => {
      res.status(201).json({ mensaje: 'Persona registrada exitosamente', resultado });
    })
    .catch((err) => {
      console.error('Error al registrar persona:', err);
      res.status(500).json({ mensaje: 'Error al registrar persona', error: err.message });
    });
};

// Eliminar una persona por cédula
const eliminarPersona = (req, res) => {
  const cedula = req.params.cedula;

  Persona.eliminarPersona(cedula)
    .then((resultado) => {
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Persona no encontrada' });
      }
      res.status(200).json({ mensaje: 'Persona eliminada exitosamente' });
    })
    .catch((err) => {
      console.error('Error al eliminar persona:', err);
      res.status(500).json({ mensaje: 'Error al eliminar persona', error: err.message });
    });
};

module.exports = {
  obtenerPersonas,
  crearPersona,
  eliminarPersona
};