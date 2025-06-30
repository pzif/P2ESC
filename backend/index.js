require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const sequelize = require('./config/db');
const connectMongo = require('./config/mongo');

// Models 
require('./models/course');
require('./models/user'); 
require('./models/note'); 

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses'); 
const noteRoutes = require('./routes/note');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    // Conecta ao banco relacional e sincroniza modelos
    await sequelize.sync({ alter: true });
    console.log('PostgreSQL sincronizado');

    // Conecta ao MongoDB
    await connectMongo();
    console.log('MongoDB conectado');

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
  }
};

// CHAMA A FUNÇÃO START
start();

start();
