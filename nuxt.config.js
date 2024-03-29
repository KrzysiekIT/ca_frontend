export default {
  server: {
    host: "0",
    port: 54321
  },
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
    { src: "~plugins/v-calendar.js", ssr: false },
    { src: "~plugins/slide-menu.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/fontawesome", "@nuxtjs/dotenv"],
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
        "faMinusCircle",
        "faUsersSlash",
        "faChalkboardTeacher",
        "faPlusCircle",
        "faSignOutAlt"
      ]
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/style-resources",
    "nuxt-i18n",
    "nuxt-socket-io",
    "vue2-editor/nuxt"
  ],
  io: {
    // module options
    sockets: [
      {
        name: "main",
        url: process.env.SOCKET_URL
      }
    ]
  },
  i18n: {
    strategy: "no_prefix",
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
  build: {
    splitChunks: {
      layouts: true
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      });
    }
  },

  router: {
    middleware: ["auth"]
  }
};
