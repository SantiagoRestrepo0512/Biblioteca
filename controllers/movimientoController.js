const Movimiento = require('../models/movimientoModel');

const obtenerMovimientos = (req, res) => {
  Movimiento.obtenerMovimientos()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ mensaje: 'Error al obtener movimientos', error: err.message }));
};

const registrarPrestamo = (req, res) => {
  const { cedula_persona, id_material, fecha } = req.body;
  console.log('Datos recibidos para préstamo:', req.body);

  Movimiento.registrarPrestamo(cedula_persona, id_material, fecha)
    .then(result => {
      res.status(201).json({ mensaje: 'Préstamo registrado correctamente', result });
    })
    .catch(err => {
      console.error('Error en registrarPrestamo:', err);
      const statusCode =
        typeof err === 'string' && err.includes('máximo de préstamos')
          ? 400
          : 500;
      res.status(statusCode).json({
        mensaje: 'Error al registrar el préstamo',
        error: err.message || err
      });
    });
};


const registrarDevolucion = (req, res) => {
  const { cedula_persona, id_material, fecha } = req.body;
  Movimiento.registrarDevolucion(cedula_persona, id_material, fecha)
    .then(result => res.status(201).json({ mensaje: 'Devolución registrada correctamente', result }))
    .catch(err => res.status(500).json({ mensaje: 'Error al registrar la devolución', error: err.message }));
};


module.exports = {
  obtenerMovimientos,
  registrarPrestamo,
  registrarDevolucion,
};