// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    devtools: { enabled: false },
    ssr: false,
    pages: true,

    runtimeConfig: {
		public: {
		  baseURL: 'http://localhost:8008/',
		},
	},

    css: [
        '~/assets/css/common.css'
    ],

    build: {
        transpile: ['vuetify'],
    },
    modules: [
        '@nuxtjs/google-fonts',

        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        //...
    ],
    vite: {
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
    googleFonts: {
        families: {
            // a simple name
            Roboto: [400, 500, 700],
        }
    }
})
