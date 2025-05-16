const express = require('express');
const { scrapeLogic } = require('./scrapeLogic');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta POST
app.post('/login-sri', scrapeLogic);

app.get('/', (req, res) => {
  res.send('¡Hola desde Express en Windows!');
});

app.listen(PORT, () => {
  console.log(`✅ API corriendo en http://localhost:${PORT}`);
});
