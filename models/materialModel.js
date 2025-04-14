const db = require('../db');

const Material = {
  obtenerMateriales: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM material', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  crearMaterial: (titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO material (titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [titulo, tipo, fecha_registro, cantidad_registrada, cantidad_actual], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  eliminarMaterial: (id) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM material WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  incrementarCantidad: (id, cantidad) => {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE material SET cantidad_actual = cantidad_actual + ? WHERE id = ?';
      db.query(query, [cantidad, id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Material;