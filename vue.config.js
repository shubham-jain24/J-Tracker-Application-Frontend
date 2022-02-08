module.exports = {
    devServer: {
          proxy: 'https://jtracker-backend.herokuapp.com/',
      },

    pluginOptions: {
      quasar: {
        importStrategy: 'kebab',
        rtlSupport: false
      }
    },

    transpileDependencies: [
      'quasar'
    ]
}
