const express = require('express')
const app = express()
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Conexión a la base de datos MySQL utilizando Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    retry: {
        max: 10 // Reintentar 10 veces
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000, // Esperar 30 segundos antes de fallar
        idle: 10000
      }
});

// Definir un modelo para la tabla 'Users'
const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Sincronizar el modelo con la base de datos
sequelize.sync();

// Endpoint para agregar usuarios
app.post('/api/users', async (req, res) => {
    const { firstName, lastName, age } = req.body;
    try {
        const user = await User.create({ firstName, lastName, age });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Endpoint para listar usuarios
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});