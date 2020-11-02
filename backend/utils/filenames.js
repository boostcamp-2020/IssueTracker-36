const fs = require('fs');

module.exports = (dir) => {
  const filenames = [];
  fs.readdirSync(dir).forEach((filename) => {
    if (filename.includes('index')) return;
    const excluded = filename.replace('.js', '');
    filenames.push(excluded);
  });

  return filenames;
};
