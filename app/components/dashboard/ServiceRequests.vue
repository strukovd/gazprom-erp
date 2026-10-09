<template>
	<BaseIsland class="service-requests">
		<header class="sr-header">
			<BaseIcon class="sr-icon" name="flame" size="1.5em"/>
			<h2 class="sr-title">Заявки по видам услуг</h2>
		</header>
		<div class="sr-content">
			<BaseTabs v-model="audience" :items="audiences">
				<div v-if="audience === 'residents'" class="sr-services">
					<BaseIsland v-for="service in services" :key="service.key" class="sr-service">
						<div class="sr-info">
							<div class="sr-service-icon status" :class="`${service.color}`">
								<BaseIcon :name="service.icon" size="1.5em"/>
							</div>
							<div class="sr-description">
								<h3 class="sr-name">{{ service.title }}</h3>
								<p class="sr-total">Всего: {{ Object.values(service.counts).reduce((sum, count) => sum + count, 0) }}</p>
							</div>
						</div>
						<div class="sr-counts">
							<div v-for="status in statuses" :key="status.key" class="sr-count">
								<span class="status" :class="`${status.color}`">{{ service.counts[status.key] }}</span>
								<span class="sr-label">{{ status.title }}</span>
							</div>
						</div>
						<BaseButton :aria-label="`Открыть: ${service.title}`" @click="navigateTo({ path: '/applications', query: { service: service.key, audience } })">Открыть</BaseButton>
					</BaseIsland>
				</div>
				<p v-else class="sr-empty">Данные по заявкам юридических лиц пока не подключены.</p>
			</BaseTabs>
		</div>
	</BaseIsland>
</template>

<script lang="ts" setup>
import BaseButton from '~/components/common/base/BaseButton.vue';
import BaseIcon from '~/components/common/base/BaseIcon.vue';
import BaseIsland from '~/components/common/base/BaseIsland.vue';
import BaseTabs from '~/components/common/base/BaseTabs.vue';

const audience = ref<string | number>('residents');
const audiences = [
	{ key: 'residents', value: 'Население', icon: 'mdi:account-group-outline' },
	{ key: 'business', value: 'Юридические лица', icon: 'mdi:office-building-outline' },
];
const statuses = [
	{ key: 'new', title: 'Новые', color: 'blue' },
	{ key: 'inProgress', title: 'В работе', color: 'purple' },
	{ key: 'completed', title: 'Готово', color: 'green' },
	{ key: 'overdue', title: 'Просрочено', color: 'red' },
] as const;

// Показанная часть макета; список можно дополнить следующими услугами.
const services = [
	{ key: 'gasification', title: 'Новая газификация', icon: 'flame', color: 'orange', counts: { new: 3, inProgress: 8, completed: 4, overdue: 0 } },
	{ key: 'reinstallation', title: 'Перемонтаж', icon: 'mdi:cog-outline', color: 'blue', counts: { new: 4, inProgress: 5, completed: 2, overdue: 1 } },
	{ key: 'drawing-restoration', title: 'Восстановление эскизного чертежа', icon: 'mdi:file-document-outline', color: 'purple', counts: { new: 2, inProgress: 3, completed: 3, overdue: 0 } },
	{ key: 'gas-connection', title: 'Подключение к газоснабжению (врезка)', icon: 'mdi:link-variant', color: 'green', counts: { new: 3, inProgress: 5, completed: 2, overdue: 1 } },
];
</script>

<style lang="scss">
.service-requests {
	padding: 0;

	.sr-header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.75rem 2rem;
		background: linear-gradient(110deg, #2156ff, #153de9);
		color: #fff;

		.sr-icon {
			color: #ff8000;
		}

		.sr-title {
			margin: 0;
			font-size: 1.5rem;
			font-weight: 600;
		}
	}

	.sr-content {
		padding: 1.5rem 2rem 2rem;

		.base-tabs {
			.bt-content {
				.sr-services {
					display: flex;
					flex-direction: column;
					gap: 1rem;

					.sr-service {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 1.5rem;

						.sr-info {
							display: flex;
							align-items: center;
							flex: 1 1 18rem;
							gap: 1rem;
							min-width: 0;

							.sr-service-icon {
								display: flex;
								align-items: center;
								justify-content: center;
								flex-shrink: 0;
								width: 3.5rem;
								aspect-ratio: 1;
								padding: 0;
								border-radius: .875rem;
								font-size: 1rem;
							}

							.sr-description {
								.sr-name {
									margin: 0;
									font-size: 1rem;
									font-weight: 500;
									line-height: 1.5;
								}

								.sr-total {
									margin: .375rem 0 0;
									color: #64748b;
									font-size: .875rem;
								}
							}
						}

						.sr-counts {
							display: flex;
							gap: 1.5rem;

							.sr-count {
								display: flex;
								flex-direction: column;
								align-items: center;
								gap: .5rem;

								.status {
									font-size: 1.125rem;
								}

								.sr-label {
									color: #64748b;
									font-size: .8rem;
								}
							}
						}
					}
				}

				.sr-empty {
					margin: 0;
					padding-block: 1rem;
					color: #64748b;
				}
			}
		}
	}
}
</style>
