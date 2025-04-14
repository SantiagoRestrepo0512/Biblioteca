// controllers/materialController.js
const Material = require('../models/materialModel');

const obtenerMateriales = (req, res) => {
  Material.obtenerMateriales()
    .then((materiales) => res.status(200).json(materiales))
    .catch((err) => {
      console.error('Error al obtener materiales:', err);
      res.status(500).json({ mensaje: 'Error al obtener los materiales', error: err.message });
    });
};

const crearMaterial = (req, res) => {
  const { titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual } = req.body;

  Material.crearMaterial(titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual)
    .then((resultado) => res.status(201).json({ mensaje: 'Material registrado exitosamente', id: resultado.insertId }))
    .catch((err) => {
      console.error('Error al registrar material:', err);
      if (err.message === 'El material con este título ya está registrado.') {
        res.status(400).json({ mensaje: err.message });
      } else {
        res.status(500).json({ mensaje: 'Error al registrar material', error: err.message });
      }
    });
};

const eliminarMaterial = (req, res) => {
  const id = req.params.id;

  Material.eliminarMaterial(id)
    .then(() => res.status(200).json({ mensaje: 'Material eliminado correctamente' }))
    .catch((err) => {
      console.error('Error al eliminar material:', err);
      res.status(500).json({ mensaje: 'Error al eliminar material', error: err.message });
    });
};

const incrementarCantidad = (req, res) => {
  const id = req.params.id;
  const { cantidad } = req.body;

  Material.incrementarCantidad(id, cantidad)
    .then(() => res.status(200).json({ mensaje: 'Cantidad actualizada exitosamente' }))
    .catch((err) => {
      console.error('Error al incrementar cantidad:', err);
      res.status(500).json({ mensaje: 'Error al incrementar cantidad', error: err.message });
    });
};

module.exports = {
  obtenerMateriales,
  crearMaterial,
  eliminarMaterial,
  incrementarCantidad
};