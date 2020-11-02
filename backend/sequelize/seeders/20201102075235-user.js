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
      for (let i = 0; i < 100; i += 1) {
        const obj = {
          id: i,
          local_id: `test${i}`,
          password: `password${i}`,
          nick_name: `user_${i}`,
          provider: 'Github',
          created_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updated_at: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        };
        datas.push(obj);
      }

      return queryInterface.bulkInsert('user', datas, {});
    } catch (err) {
      console.log(err);
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('user', null, {});
  },
};
