module.exports = {
  up: async (queryInterface) => {
    const datas = [
      {
        id: 1,
        title: 'bug',
        description: "something isn't working",
        color: '#CC3D3D',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      },
      {
        id: 2,
        title: 'feature',
        description: 'New feature or request',
        color: '#00D8FF',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      },
      {
        id: 3,
        title: 'good first issue',
        description: 'Good for newcomers',
        color: '#A566FF',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      },
      {
        id: 4,
        title: 'help wanted',
        description: 'Extra attention is needed',
        color: '#FF0000',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      },
      {
        id: 5,
        title: 'Invalid',
        description: "This doesn't seems right",
        color: '#CCA63D',
        created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      },
    ];

    return queryInterface.bulkInsert('label', datas, {});
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('label', null, {});
  },
};
