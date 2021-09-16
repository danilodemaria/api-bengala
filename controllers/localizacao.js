const Localizacao = require('../models/Localizacao');

const criarLocalizacao = async (id_dispositivo, latitute, longitude) => {
  const localizacaoCriada = await Localizacao.create({
    id_dispositivo,
    latitute,
    longitude,
  });
  return localizacaoCriada;
};

const buscarTodasLocalizacoesDispositivo = async (where) => {
  const localizacoes = await Localizacao.findAll({
    raw: true,
    where,
  });
  return localizacoes;
};

const deletaTodasLocalizacoesDispositivo = async (where) => {
  const deletado = await Localizacao.destroy({ where });
  return deletado;
};

module.exports = {
  criarLocalizacao,
  buscarTodasLocalizacoesDispositivo,
  deletaTodasLocalizacoesDispositivo,
};
