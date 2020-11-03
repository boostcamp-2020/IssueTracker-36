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
      for (let i = 0; i <= 10; i += 1) {
        const obj = {
          id: i,
          due_date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          title: `milestone${i}`,
          description: `milestone_${i}`,
          is_closed: i % 2 === 1 ? 1 : 0,
          created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        };
        datas.push(obj);
      }

      return queryInterface.bulkInsert('milestone', datas, {});
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('milestone', null, {});
  },
};
