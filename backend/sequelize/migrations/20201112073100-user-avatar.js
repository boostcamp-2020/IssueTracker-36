module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('user', 'img_url', {
      type: Sequelize.STRING,
      allowNul: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('user', 'img_url');
  },
};
