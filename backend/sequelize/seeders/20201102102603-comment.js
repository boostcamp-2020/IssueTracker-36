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
      for (let i = 1; i <= 200; i += 1) {
        const obj = {
          id: i,
          issue_id: Math.floor(Math.random() * 99) + 1,
          user_id: Math.floor(Math.random() * 99) + 1,
          is_main: i > 20 ? 1 : 0,
          content: `This is Comment!! comment id=${i}`,
          created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        };
        datas.push(obj);
      }

      return queryInterface.bulkInsert('comment', datas, {});
    } catch (err) {
      console.log(err);
    }
    return null;
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('comment', null, {});
  },
};
