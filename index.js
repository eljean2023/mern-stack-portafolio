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
