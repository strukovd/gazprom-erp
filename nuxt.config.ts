// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	ssr: false,
	nitro: {
		preset: 'static',
	},
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/scripts', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/icon'],
	css: ['~/assets/styles/global.scss'],
	icon: {
		provider: 'iconify',
		clientBundle: {
			scan: true,
		},
	},
})
