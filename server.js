const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al conectar con la IA', detail: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'Innova AI Backend activo ✓' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
