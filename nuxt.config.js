module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'weekendHACK - Chaostreff Flensburg', // TODO: get title from config
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { href:"https://fonts.googleapis.com/css?family=Arvo:400,700", rel:"stylesheet"},
      { rel: 'icon', type: 'image/png', href: '/favicon.png', size: '96x96' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css'],

  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'vue-moment-jalaali']
  },
  plugins: ['~plugins/vue-moment']
}
