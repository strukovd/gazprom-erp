<template>
	<section id="home-page">
		<h1 class="hp-title">Dashboard</h1>
		<p class="hp-description">Рабочая панель ERP-Единое окно</p>
	</section>
</template>

<script lang="ts" setup>
useHead({ title: 'Dashboard — ERP-Единое окно' });
</script>

<style lang="scss">
#home-page {
	.hp-title {
		margin: 0;
		font-size: 1.75rem;
		font-weight: 600;
	}

	.hp-description {
		margin: .75rem 0 0;
		color: #64748b;
	}
}
</style>
