const express = require('express');
const {
  criarLocalizacao,
  buscarTodasLocalizacoesDispositivo,
} = require('../controllers/localizacao');
const { buscarUmDispositivo } = require('../controllers/dispositivo');
const router = express.Router();

// rota GET para buscar todas as localizações cadastrados
router.get('/:uuid', async (req, res, next) => {
  const { uuid } = req.params;
  try {
    const dispositivo = await buscarUmDispositivo({ uuid });
    const localizacoes = await buscarTodasLocalizacoesDispositivo({
      id_dispositivo: dispositivo.id,
    });
    return res.status(200).send(localizacoes);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// rota POST para criar uma nova localizacao no banco de dados
router.post('/', async (req, res, next) => {
  const { uuid, latitude, longitude } = req.body;
  try {
    const dispositivo = await buscarUmDispositivo({ uuid });
    const localizacaoCriada = await criarLocalizacao(
      dispositivo.id,
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

// rota GET para buscar através da localização informada, se existe um objeto próximo
router.get('/obstaculo/:latitude/:longitude', async (req, res, next) => {
  const { latitude, longitude } = req.params;
  try {
    const obstaculo = await buscarTodasLocalizacoesDispositivo({
      latitude,
      longitude,
    });
    return res.status(200).send({ temObstaculo: obstaculo.length > 0 });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
