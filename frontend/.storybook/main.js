const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-knobs'],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@layouts': path.resolve(__dirname, '../layouts'),
      '@components': path.resolve(__dirname, '../components'),
      '@pages': path.resolve(__dirname, '../pages'),
      '@utils': path.resolve(__dirname, '../utils'),
      '@static': path.resolve(__dirname, '../static'),
      '@services': path.resolve(__dirname, '../services'),
      '@plugins': path.resolve(__dirname, '../plugins'),
    };
    config.resolve.extensions.push('.js', '.jsx');
    return config;
  },
};
