const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../config/database');
const logger = require('../utils/logger');
const readModels = (dirname, basename) => {
  const models = [];
  fs.readdirSync(dirname).forEach((file) => {
    if (
      file.indexOf('.') !== 0 &&
      file !== path.basename(basename) &&
      file.slice(-3) === '.js'
    ) {
      const model = require(path.resolve(dirname, file));
      models.push(model);
    }
  });

  return models;
};

const models = readModels(__dirname, __filename);

class Database {
  constructor() {
    this.sequelize = new Sequelize(config);
    this.init();
  }

  init() {
    logger.info('INICIALIZANDO BANCO DE DADOS');
    models
      .map((model) => model.init(this.sequelize))
      .map(
        (model) => model.associate && model.associate(this.sequelize.models)
      );
    logger.info('BANCO DE DADOS ONLINE');
  }
}

module.exports = new Database();
