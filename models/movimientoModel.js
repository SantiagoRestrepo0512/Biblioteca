const db = require('../db');

const Movimiento = {
  // Obtener todos los movimientos
  obtenerMovimientos: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM movimiento', (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  },

  obtenerPrestamosActivos: (cedula_persona) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT SUM(pendientes) AS prestamosActivos FROM (
          SELECT 
            id_material,
            COUNT(CASE WHEN tipo = 'prestamo' THEN 1 END) - 
            COUNT(CASE WHEN tipo = 'devolucion' THEN 1 END) AS pendientes
          FROM movimiento
          WHERE cedula_persona = ?
          GROUP BY id_material
        ) AS subconsulta
        WHERE pendientes > 0;
      `;
      db.query(query, [cedula_persona], (err, results) => {
        if (err) return reject(err);
        resolve(results[0].prestamosActivos || 0); // Si es null, que devuelva 0
      });
    });
  },
  

  registrarPrestamo: (cedula_persona, id_material, fecha) => {
    return new Promise((resolve, reject) => {
      // Obtener el rol de la persona
      db.query('SELECT rol FROM persona WHERE cedula = ?', [cedula_persona], (err, results) => {
        if (err) {
          console.log('Error al obtener rol:', err);
          return reject('Error al obtener rol');
        }
        if (results.length === 0) {
          console.log('Persona no registrada');
          return reject('Persona no registrada');
        }
  
        const rol = results[0].rol;
        let maxPrestamos;
  
        // Establecer el límite de préstamos según el rol de la persona
        switch (rol) {
          case 'estudiante':
            maxPrestamos = 5;
            break;
          case 'profesor':
            maxPrestamos = 3;
            break;
          case 'administrativo':
            maxPrestamos = 1;
            break;
          default:
            console.log('Rol no válido');
            return reject('Rol no válido');
        }
  
        // Verificar cuántos préstamos activos tiene la persona
        Movimiento.obtenerPrestamosActivos(cedula_persona)
          .then(prestamosActivos => {
            // Verificar si la persona ha alcanzado el límite de préstamos
            if (prestamosActivos >= maxPrestamos) {
              console.log('Límite de préstamos alcanzado');
              return reject(`El máximo de préstamos para este rol es ${maxPrestamos}`);
            }
  
            // Registrar el préstamo
            const query = 'INSERT INTO movimiento (cedula_persona, id_material, tipo, fecha) VALUES (?, ?, "prestamo", ?)';
            db.query(query, [cedula_persona, id_material, fecha], (err, results) => {
              if (err) {
                console.log('Error al registrar préstamo:', err);
                return reject('Error al registrar préstamo');
              }
  
              // Reducir la cantidad total del material cuando se hace un préstamo
              const updateQuery = 'UPDATE material SET cantidad_actual = cantidad_actual - 1 WHERE id = ?';
              db.query(updateQuery, [id_material], (err, results) => {
                if (err) {
                  console.log('Error al actualizar cantidad del material:', err);
                  return reject('Error al actualizar cantidad del material');
                }
                resolve(results);
              });
            });
          })
          .catch(err => {
            console.log('Error al obtener préstamos activos:', err);
            reject('Error al obtener préstamos activos');
          });
      });
    });
  },

  // Registrar una devolución
  registrarDevolucion: (cedula_persona, id_material, fecha) => {
    return new Promise((resolve, reject) => {
      // Verificar si la persona existe
      db.query('SELECT * FROM persona WHERE cedula = ?', [cedula_persona], (err, result) => {
        if (err) return reject(err);
        if (result.length === 0) return reject(new Error('Persona no registrada'));
  
        // Verificar si la persona tiene un préstamo pendiente de ese material
        const consulta = `
          SELECT 
            (SELECT COUNT(*) FROM movimiento WHERE cedula_persona = ? AND id_material = ? AND tipo = 'prestamo') -
            (SELECT COUNT(*) FROM movimiento WHERE cedula_persona = ? AND id_material = ? AND tipo = 'devolucion') 
            AS prestamosPendientes
        `;
  
        db.query(consulta, [cedula_persona, id_material, cedula_persona, id_material], (err, res2) => {
          if (err) return reject(err);
  
          const pendientes = res2[0].prestamosPendientes || 0;
  
          if (pendientes <= 0) {
            return reject(new Error('No hay préstamos pendientes de este material para devolver'));
          }
  
          // Insertar movimiento de devolución
          const query = 'INSERT INTO movimiento (tipo, fecha, cedula_persona, id_material) VALUES (?, ?, ?, ?)';
          db.query(query, ['devolucion', fecha, cedula_persona, id_material], (err, result) => {
            if (err) return reject(err);
  
            // Sumar 1 a la cantidad actual del material
            const actualizar = 'UPDATE material SET cantidad_actual = cantidad_actual + 1 WHERE id = ?';
            db.query(actualizar, [id_material], (err, result2) => {
              if (err) return reject(err);
              resolve(result2);
            });
          });
        });
      });
    });
  }
};

module.exports = Movimiento;
