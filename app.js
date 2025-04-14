// app.js
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

// Middlewares
app.use(express.json());

// Rutas
const materialRoutes = require('./routes/materialRoutes');
app.use('/material', materialRoutes);

const personaRoutes = require('./routes/personaRoutes');
app.use('/persona', personaRoutes);

const movimientoRoutes = require('./routes/movimientoRoutes');  // Añadir la ruta de movimiento
app.use('/movimiento', movimientoRoutes);  // Usar '/movimiento' como prefijo

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});