const express = require('express');
const { Op } = require('sequelize');
const {
  criarLocalizacao,
  buscarTodasLocalizacoesDispositivo,
  deletaTodasLocalizacoesDispositivo,
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
      Number(latitude),
      Number(longitude)
    );
    delete localizacaoCriada.dataValues.id;
    delete localizacaoCriada.dataValues.id_dispositivo;
    delete localizacaoCriada.dataValues.atualizado_em;
    logger.info(
      `LOCALIZAÇÃO GRAVADA: LATITUDE ${latitude} - LONGITUDE ${longitude}`
    );
    return res.status(200).send({ localizacaoCriada });
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
});

const calcularXeY = (latitude, longitude) => {
  const tresMetrosEmGrau = 0.00002;
  const latitude1 = latitude - tresMetrosEmGrau;
  const latitude2 = latitude + tresMetrosEmGrau;
  const longitude1 = longitude - tresMetrosEmGrau;
  const longitude2 = longitude + tresMetrosEmGrau;
  return { latitude1, latitude2, longitude1, longitude2 };
};

// rota GET para buscar através da localização informada, se existe um objeto próximo
router.post('/obstaculo/', async (req, res, next) => {
  const { latitude, longitude } = req.body;
  if (latitude == 0 && longitude == 0) return res.status(200).send(false);
  const { latitude1, longitude1, latitude2, longitude2 } = calcularXeY(
    Number(latitude),
    Number(longitude)
  );
  try {
    const obstaculos = await buscarTodasLocalizacoesDispositivo({
      latitude: { [Op.between]: [latitude1, latitude2] },
      longitude: { [Op.between]: [longitude1, longitude2] },
    });
    logger.info(
      `latitde: ${latitude} - longitude ${longitude} - tem obstaculo: ${
        obstaculos.length > 0
      }`
    );
    return res.status(200).send(obstaculos.length > 0);
    // return res.status(200).send(true);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(error);
  }
});

router.delete('/obstaculo/:latitude/:longitude', async (req, res) => {
  const { latitude, longitude } = req.params;
  const { latitude1, longitude1, latitude2, longitude2 } = calcularXeY(
    Number(latitude),
    Number(longitude)
  );
  try {
    await deletaTodasLocalizacoesDispositivo({
      latitude: { [Op.between]: [latitude1, latitude2] },
      longitude: { [Op.between]: [longitude1, longitude2] },
    });
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
