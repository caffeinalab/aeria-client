module.exports = {
  sourceMaps: true,
  'presets': [
    ['@babel/env', {
      'targets': {
        'browsers': [
          'last 3 Safari major versions',
          'last 3 iOS major versions',
          'last 3 Chrome major versions',
          'last 3 Firefox major versions',
          'last 3 Edge major versions',
          'Explorer 11'
        ]
      },
      'useBuiltIns': 'usage',
      'corejs': 3
    }],
    ['@babel/preset-react']
  ],
  'plugins': [
    'babel-plugin-styled-components',
    [
      '@babel/plugin-proposal-decorators', {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
