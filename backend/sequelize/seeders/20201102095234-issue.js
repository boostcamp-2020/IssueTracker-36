module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      const datas = [];
      for (let i = 1; i <= 100; i += 1) {
        const obj = {
          id: i,
          title: `issue${i}`,
          is_closed: i % 2 === 1 ? 1 : 0,
          milestone_id: Math.floor(Math.random() * 10) + 1,
          created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        };
        datas.push(obj);
      }

      return queryInterface.bulkInsert('issue', datas, {});
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('issue', null, {});
  },
};
