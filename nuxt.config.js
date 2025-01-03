export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Elf Market',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Elf Bar поможет расслабиться, получить удовольствие. Вкус и богатый, насыщенный аромат подарят незабываемые ощущения. ' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/defaults.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/api' },
    { src: '~plugins/firebase', ssr: false },
    { src: '~plugins/fireauth' },
    { src: '~plugins/vuelidate' },
    { src: '~plugins/touch-events' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['nuxt-compress'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'nuxt-lazy-load'
  ],

  privateRuntimeConfig: {
    NOVA_POSHTA_API_KEY: process.env.NOVA_POSHTA_API_KEY
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
}
