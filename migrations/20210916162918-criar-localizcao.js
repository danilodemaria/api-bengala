module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('localizacoes', {
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
        type: Sequelize.UUID,
        unique: true,
      },
      atualizado_em: {
        type: Sequelize.DATE,
      },
      criado_em: {
        type: Sequelize.DATE,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('localizacoes'),
};
