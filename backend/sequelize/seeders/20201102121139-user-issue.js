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
          issue_id: i,
          user_id: i,
          is_owner: 1,
          created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        };
        datas.push(obj);
      }
      for (let i = 101; i <= 200; i += 1) {
        const obj = {
          id: i,
          issue_id: Math.floor(Math.random() * 99) + 1,
          user_id: Math.floor(Math.random() * 99) + 1,
          is_owner: 0,
          created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        };
        datas.push(obj);
      }

      return queryInterface.bulkInsert('user_issue', datas, {});
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user_issue', null, {});
  },
};
