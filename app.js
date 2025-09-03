const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const DATAGRID_URL = process.env.DATAGRID_URL || 'http://datagrid-cluster:11222/rest';

app.post('/cache/:key', async (req, res) => {
  const { key } = req.params;
  const value = req.body.value || 'valor-padrao';
  await axios.post('${DATAGRID_URL}/${key}', value);
  res.send('Salvo: ${key} = ${value}');
});

app.get('/cache/:key', async (req, res) => {
  const { key } = req.params;
  try {
    const response = await axios.get('${DATAGRID_URL}/${key}');
    res.send('Valor: ${response.data}');
  } catch (err) {
    res.status(404).send('Chave não encontrada');
  }
});

app.listen(3000, () => console.log('API rodando na porta 3000'));
