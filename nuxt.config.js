module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-pro',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~assets/sass/main.scss'
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  modules: [
    '@nuxtjs/axios'
  ],
  axios:[
  ],
  */
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: (process.env.NODE_ENV !== 'production')?(process.env.BASE_URL || 'https://citmp.haohushi.me:8443'):(process.env.BASE_URL || 'https://wxtmp.haohushi.me:8443')
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      /*
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      */
    }
  }
}
