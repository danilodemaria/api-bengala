const express = require('express');
const { Op } = require('sequelize');
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

const calcularXeY = (latitude, longitude) => {
  const umMetroEmGrau = 0.000009;
  const latitude1 = latitude - umMetroEmGrau;
  const latitude2 = latitude + umMetroEmGrau;
  const longitude1 = longitude - umMetroEmGrau;
  const longitude2 = longitude + umMetroEmGrau;
  return { latitude1, latitude2, longitude1, longitude2}
}

// rota GET para buscar através da localização informada, se existe um objeto próximo
router.get('/obstaculo/:latitude/:longitude', async (req, res, next) => {
  const { latitude, longitude } = req.params;
  const { latitude1, longitude1, latitude2, longitude2} = calcularXeY(Number(latitude), Number(longitude));
  try {
    const obstaculos = await buscarTodasLocalizacoesDispositivo({
      latitude: { [Op.between]: [latitude1, latitude2 ]},
      longitude: { [Op.between]: [longitude1, longitude2 ]},
    });
    return res.status(200).send(obstaculos.length > 0);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
