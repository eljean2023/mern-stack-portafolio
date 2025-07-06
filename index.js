require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected'))
  .catch(console.error);

// Static file serving for avatar uploads
app.use('/uploads', express.static('uploads'));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Run the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ✅ Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected'))
  .catch(console.error);

// ✅ CORS con origen del frontend
app.use(cors({
  origin: 'https://mern-stack-portafolio.onrender.com', // 🔁 Cambia por tu frontend URL real
  credentials: true,
}));

app.use(express.json());

// ✅ Ruta para servir imágenes (avatares, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Tus rutas API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// ✅ Producción: servir archivos del frontend si fuera necesario
// Si usas el mismo servidor para frontend y backend:
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// ✅ Escucha en puerto dinámico (para Render, Heroku, etc.)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected'))
  .catch(console.error);

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

app.listen(5000,'0.0.0.0', () => console.log('Server is running on port 5000'));
*/