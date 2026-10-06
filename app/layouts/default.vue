<template>
	<div class="default-layout">
		<AppSidebar v-model:collapsed="sidebarCollapsed" user-name="Иванов И.И." user-role="Оператор МРБ" @logout="navigateTo('/login')"/>
		<main class="dl-content">
			<slot/>
		</main>
	</div>
</template>
<script lang="ts" setup>
import AppSidebar from '~/components/AppSidebar.vue';

const sidebarCollapsed = useState('sidebar-collapsed', () => false);
</script>
<style lang="scss">
.default-layout {
	display: flex;
	height: 100dvh;
	background: #f6f7fb;

	.dl-content {
		flex: 1;
		min-width: 0;
		overflow: auto;
		padding: clamp(1.5rem, 3vw, 3rem);
	}
}
</style>
