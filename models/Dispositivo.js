const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

class Dispositivo extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.BIGINT,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        uuid: {
          type: Sequelize.UUIDV4,
          unique: true,
        },
        criado_em: {
          type: Sequelize.DATE,
        },
      },
      {
        hooks: {
          beforeCreate: async (device) => {
            device.uuid = uuidv4();
          },
        },
        freezeTableName: true,
        timestamps: true,
        createdAt: 'criado_em',
        sequelize,
        modelName: 'dispositivos',
      }
    );

    return this;
  }
}

module.exports = Dispositivo;
