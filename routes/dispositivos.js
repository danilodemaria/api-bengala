const express = require('express');
const {
  criarDispositivo,
  buscarTodosDispositivos,
} = require('../controllers/dispositivo');
const router = express.Router();

// rota GET para buscar todos dispositivos cadastrados
router.get('/todos', async (req, res, next) => {
  try {
    const dispositivos = await buscarTodosDispositivos();
    return res.status(200).send(dispositivos);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// rota POST para criar um novo dispositivo no banco de dados
router.post('/', async (req, res, next) => {
  const { nome } = req.body;
  try {
    const dispositivoCriado = await criarDispositivo(nome);
    return res
      .status(200)
      .send({ message: 'Dipositivo criado com sucesso!', dispositivoCriado });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
