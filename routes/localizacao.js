const express = require('express');
const {
  criarLocalizacao,
  buscarTodasLocalizacoesDispositivo,
} = require('../controllers/localizacao');
const router = express.Router();

// rota GET para buscar todas as localizações cadastrados
router.get('/:id_dispositivo', async (req, res, next) => {
  const { id_dispositivo } = req.params;
  try {
    const localizacoes = await buscarTodasLocalizacoesDispositivo({
      id_dispositivo,
    });
    return res.status(200).send(localizacoes);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// rota POST para criar uma nova localizacao no banco de dados
router.post('/', async (req, res, next) => {
  const { id_dispositivo, latitude, longitude } = req.body;
  try {
    const localizacaoCriada = await criarLocalizacao(
      id_dispositivo,
      latitude,
      longitude
    );
    return res
      .status(200)
      .send({ message: 'Localização criado com sucesso!', localizacaoCriada });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
