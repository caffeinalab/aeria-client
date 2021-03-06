const path = require('path')
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin')

module.exports = async ({ config, mode }) => {

  if (!config.module.rules) config.module.rules = []

  // config.module.rules.push({
  //   test: /\.(stories|story)\.mdx$/,
  //   use: [
  //     {
  //       loader: 'babel-loader',
  //       // may or may not need this line depending on your app's setup
  //       plugins: ['@babel/plugin-transform-react-jsx'],
  //     },
  //     {
  //       loader: '@mdx-js/loader',
  //       options: {
  //         compilers: [createCompiler({})],
  //       },
  //     },
  //   ],
  // })

  // config.module.rules.push({
  //   test: /\.(stories|story)\.[tj]sx?$/,
  //   loader: require.resolve('@storybook/source-loader'),
  //   exclude: [/node_modules/],
  //   enforce: 'pre',
  // })

  return config
};
