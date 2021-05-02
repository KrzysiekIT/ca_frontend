export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Champions academy",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  styleResources: {
    scss: ["~/assets/scss/variables.scss"]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/api/init.js" },
    { src: "~/plugins/video-embed.js", mode: "client" },
    { src: "~plugins/v-calendar.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/fontawesome"],
  fontawesome: {
    component: "fa",
    icons: {
      solid: [
        "faRedo",
        "faArrowLeft",
        "faArrowRight",
        "faQuestion",
        "faLink",
        "faPaperPlane",
        "faCheck",
        "faSpinner",
        "faUserMinus",
        "faUsersSlash"
      ]
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/style-resources", "nuxt-i18n", "nuxt-socket-io"],
  io: {
    // module options
    sockets: [
      {
        name: "main",
        url: "http://localhost:41206"
      }
    ]
  },
  i18n: {
    lazy: true,
    langDir: "locales/",
    locales: [
      {
        name: "English",
        code: "en",
        iso: "en",
        file: "en"
      },
      {
        name: "Polish",
        code: "pl",
        iso: "pl",
        file: "pl"
      }
    ],
    defaultLocale: "pl"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ["auth"]
  }
};
