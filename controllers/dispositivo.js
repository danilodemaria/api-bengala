const Dispositivo = require('../models/Dispositivo');

const criarDispositivo = async (nome) => {
  const dispositivoCriado = await Dispositivo.create({
    nome,
  });
  return dispositivoCriado;
};

const buscarUmDispositivo = async (where) => {
  const device = await Dispositivo.findOne({
    raw: true,
    where,
  });
  return device;
};

const buscarTodosDispositivos = async () => {
  const devices = await Dispositivo.findAll({
    raw: true,
  });
  return devices;
};
module.exports = {
  buscarTodosDispositivos,
  buscarUmDispositivo,
  criarDispositivo,
};
