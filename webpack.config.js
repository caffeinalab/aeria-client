const fs = require('fs')
const path = require('path')
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin')

const packagesPath = path.resolve(__dirname, 'packages')
const packages = fs.readdirSync(packagesPath).reduce((acc, entry) => {
  if (fs.existsSync(`${packagesPath}/${entry}/index.js`)) {
    acc[entry] = `${packagesPath}/${entry}/index.js`
  }
  return acc
}, {})

module.exports = {
  entry: packages,
  output: {
    path: packagesPath,
    filename: '[name]/dist/index.min.js',
    library: 'aeria',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(swiper|dom7|@okiba)\/).*/,
        use: ['babel-loader']
      }
    ]
  },
  mode: 'production',
  plugins: [
    new UnminifiedWebpackPlugin()
  ]
}
