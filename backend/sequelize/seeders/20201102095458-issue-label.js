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
          issue_id: Math.floor(Math.random() * 99) + 1,
          label_id: Math.floor(Math.random() * 4) + 1,
          created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        };
        datas.push(obj);
      }

      return queryInterface.bulkInsert('issue_label', datas, {});
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('issue_label', null, {});
  },
};
