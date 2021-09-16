const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Localizacao extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        id_dispositivo: {
          type: Sequelize.BIGINT,
          allowNull: false,
        },
        latitude: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        longitude: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        uuid: {
          type: Sequelize.UUIDV4,
          unique: true,
        },
        atualizado_em: {
          type: Sequelize.DATE,
        },
        criado_em: {
          type: Sequelize.DATE,
        },
      },
      {
        hooks: {
          beforeCreate: async (localizacao) => {
            localizacao.uuid = uuidv4();
          },
        },
        freezeTableName: true,
        timestamps: true,
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        sequelize,
        modelName: 'localizacoes',
      }
    );

    return this;
  }
}

module.exports = Localizacao;
