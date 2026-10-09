<template>
	<section class="default-layout">
		<Sidebar v-model:collapsed="sidebarCollapsed" user-name="Иванов И.И." user-role="Оператор МРБ" @logout="navigateTo('/login')"/>
		<div class="dl-workspace">
			<AppHeader/>
			<main class="dl-content">
				<slot/>
			</main>
		</div>
	</section>
</template>
<script lang="ts" setup>
import Sidebar from '~/components/Sidebar.vue';
import AppHeader from '~/components/AppHeader.vue';

const sidebarCollapsed = useState('sidebar-collapsed', () => false);
</script>
<style lang="scss">
.default-layout {
	display: flex;
	height: 100dvh;
	background: #f6f7fb;

	.dl-workspace {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;

		.dl-content {
			flex: 1;
			min-height: 0;
			overflow: auto;
			padding: clamp(1.5rem, 3vw, 2.5rem);
		}
	}
}
</style>
