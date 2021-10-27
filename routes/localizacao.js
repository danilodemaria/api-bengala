const express = require('express');
const {
  criarLocalizacao,
  buscarTodasLocalizacoesDispositivo,
} = require('../controllers/localizacao');
const { buscarUmDispositivo } = require('../controllers/dispositivo');
const router = express.Router();
const logger = require('../utils/logger');

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
    logger.error(error);
    return res.status(500).send(error);
  }
});

// rota POST para criar uma nova localizacao no banco de dados
router.post('/', async (req, res, next) => {
  logger.info('ESP CONECTADA');
  const { uuid, latitude, longitude } = req.body;
  logger.info(`UUID: ${uuid}`);
  logger.info(`LATITUDE: ${latitude}`);
  logger.info(`LONGITUDE: ${longitude}`);
  try {
    const dispositivo = await buscarUmDispositivo({ uuid });
    const localizacaoCriada = await criarLocalizacao(
      dispositivo.id,
      latitude,
      longitude
    );
    delete localizacaoCriada.dataValues.id;
    delete localizacaoCriada.dataValues.id_dispositivo;
    delete localizacaoCriada.dataValues.atualizado_em;
    return res.status(200).send({ localizacaoCriada });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
});

// rota GET para buscar através da localização informada, se existe um objeto próximo
router.get('/obstaculo/:latitude/:longitude', async (req, res, next) => {
  console.log('chegoy');
  const { latitude, longitude } = req.params;
  try {
    const obstaculo = await buscarTodasLocalizacoesDispositivo({
      latitude,
      longitude,
    });
    return res.status(200).send({ temObstaculo: obstaculo.length > 0 });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
