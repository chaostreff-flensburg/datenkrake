module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'weekendHACK - Chaostreff Flensburg',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { href:"https://fonts.googleapis.com/css?family=Arvo:400,700", rel:"stylesheet"},
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    vendor: ['axios']
  }
}
