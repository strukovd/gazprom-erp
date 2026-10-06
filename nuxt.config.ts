// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	nitro: {
		preset: 'static',
	},
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/scripts', '@pinia/nuxt', '@nuxtjs/i18n'],
	css: ['@mdi/font/css/materialdesignicons.min.css', '~/assets/styles/global.scss'],
})
