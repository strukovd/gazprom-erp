<template>
	<header class="app-header">
		<form class="ah-search" role="search" @submit.prevent="searchSubscribers">
			<BaseTextBox v-model="search" name="search" aria-label="Поиск по абонентам, заявкам и адресам" placeholder="Поиск по абонентам, заявкам, адресам..." prepend-icon="mdi:magnify" autocomplete="off"/>
		</form>
		<div class="ah-actions">
			<button class="ah-notifications" type="button" popovertarget="header-notifications" aria-label="Уведомления" title="Уведомления">
				<BaseIcon name="mdi:bell-outline" size="1.4em"/>
			</button>
			<div id="header-notifications" class="ah-notification-panel" popover>
				<h2 class="ah-title">Уведомления</h2>
				<p class="ah-message">Новых уведомлений нет.</p>
			</div>
			<BaseButton prepend-icon="flame" @click="navigateTo({ path: '/applications', query: { create: 'true' } })">Создать заявку</BaseButton>
		</div>
	</header>
</template>

<script lang="ts" setup>
import BaseButton from '~/components/common/base/BaseButton.vue';
import BaseIcon from '~/components/common/base/BaseIcon.vue';
import BaseTextBox from '~/components/common/base/BaseTextBox.vue';

const search = useState('global-search', () => '');

function searchSubscribers() {
	const query = String(search.value).trim();
	if (query) navigateTo({ path: '/subscribers', query: { search: query } });
}
</script>

<style lang="scss">
.app-header {
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: space-between;
	gap: 1.5rem;
	padding: 1rem 1.5rem;
	border-bottom: 1px solid #e2e8f0;
	background: #fff;

	.ah-search {
		flex: 1;
		min-width: 0;
		max-width: 36rem;
	}

	.ah-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-shrink: 0;

		.ah-notifications {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: .625rem;
			border: 0;
			border-radius: .5rem;
			background: transparent;
			color: #475569;
			cursor: pointer;

			&:hover {
				background: #eff6ff;
				color: #2563ea;
			}

			&:focus-visible {
				outline: 2px solid #2455ff;
				outline-offset: 2px;
			}
		}

		.ah-notification-panel {
			inset: 5.5rem 1.5rem auto auto;
			width: 22rem;
			max-width: calc(100vw - 3rem);
			margin: 0;
			padding: 1.5rem;
			border: 1px solid #e2e8f0;
			border-radius: .75rem;
			background: #fff;
			color: #1f2937;
			box-shadow: 0 .75rem 2rem rgb(15 23 42 / 12%);

			.ah-title {
				margin: 0;
				font-size: 1rem;
				font-weight: 600;
			}

			.ah-message {
				margin: 1rem 0 0;
				color: #64748b;
				font-size: .875rem;
			}
		}
	}
}
</style>
