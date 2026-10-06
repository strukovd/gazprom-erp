<template>
	<section class="section-page">
		<h1 class="sp-title">{{ section?.title }}</h1>
		<p class="sp-description">Раздел пока в разработке.</p>
	</section>
</template>

<script lang="ts" setup>
import { useNavigation } from '~/composables/useNavigation';

definePageMeta({
	validate: route => useNavigation().links.some(link => link.link === route.path),
});

const route = useRoute();
const { links } = useNavigation();
const section = computed(() => links.find(link => link.link === route.path));
useHead(() => ({ title: `${section.value?.title} — ERP-Единое окно` }));
</script>

<style lang="scss">
.section-page {
	.sp-title {
		margin: 0;
		font-size: 1.75rem;
		font-weight: 600;
	}

	.sp-description {
		margin: .75rem 0 0;
		color: #64748b;
	}
}
</style>
