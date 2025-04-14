const db = require('../db'); 

const Persona = {
  obtenerPersonas: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM persona', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  crearPersona: (cedula, nombre, rol) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO persona (cedula, nombre, rol) VALUES (?, ?, ?)';
      db.query(query, [cedula, nombre, rol], (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return reject(new Error('Persona ya registrada'));
          }
          return reject(err);
        }
        resolve(results);
      });
    });
  },

  eliminarPersona: (cedula) => {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM persona WHERE cedula = ?';
      db.query(query, [cedula], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
};

module.exports = Persona;

