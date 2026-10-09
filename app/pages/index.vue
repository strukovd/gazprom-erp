<template>
	<section id="home-page">
		<header class="hp-header">
			<div class="hp-heading">
				<div class="hp-logo">
					<BaseIcon name="flame" size="2.5em"/>
				</div>
				<div class="hp-intro">
					<h1 class="hp-title">Dashboard</h1>
					<p class="hp-description">Обзор текущей ситуации по заявкам и операциям</p>
				</div>
			</div>
			<nav class="hp-actions" aria-label="Быстрые действия">
				<NuxtLink v-for="action in actions" :key="action.link" class="hp-action" :to="action.link">
					<BaseIcon class="hp-icon" :name="action.icon" size="2em"/>
					<span class="hp-label">{{ action.title }}</span>
				</NuxtLink>
			</nav>
		</header>

		<div class="hp-statistics">
			<BaseIsland v-for="stat in statistics" :key="stat.title">
				<div class="hp-stat">
					<div class="hp-stat-icon status" :class="`${stat.color}`">
						<BaseIcon :name="stat.icon" size="2em"/>
					</div>
					<p class="hp-value"><Incrementator :value="stat.value"/></p>
					<p class="hp-label">{{ stat.title }}</p>
				</div>
			</BaseIsland>
		</div>

		<div class="hp-metrics">
			<BaseIsland v-for="metric in metrics" :key="metric.title">
				<div class="hp-metric">
					<div class="hp-metric-icon status" :class="`${metric.color}`">
						<BaseIcon :name="metric.icon" size="1.75em"/>
					</div>
					<div class="hp-metric-info">
						<p class="hp-label">{{ metric.title }}</p>
						<p class="hp-value"><Incrementator v-if="typeof metric.value === 'number'" :value="metric.value"/><template v-else>{{ metric.value }}</template></p>
						<span class="outline red" :class="`${metric.changeColor}`">{{ metric.change }} к прошлому месяцу</span>
					</div>
				</div>
			</BaseIsland>
		</div>
		<ServiceRequests/>
		<RecentRequests/>
	</section>
</template>

<script lang="ts" setup>
import BaseIcon from '~/components/common/base/BaseIcon.vue';
import BaseIsland from '~/components/common/base/BaseIsland.vue';
import Incrementator from '~/components/common/Incrementator.vue';
import ServiceRequests from '~/components/dashboard/ServiceRequests.vue';
import RecentRequests from '~/components/dashboard/RecentRequests.vue';

useHead({ title: 'Dashboard — ERP-Единое окно' });

const actions = [
	{ title: 'Найти абонента', link: '/subscribers', icon: 'mdi:account-group-outline' },
	{ title: 'Открыть реестр', link: '/applications', icon: 'mdi:check-circle-outline' },
	{ title: 'Отчет по KPI', link: '/reports', icon: 'mdi:pulse' },
	{ title: 'Просроченные', link: '/kpi', icon: 'mdi:close-circle-outline' },
];

// Демонстрационные показатели до подключения API дашборда.
const statistics = [
	{ title: 'Новые', value: 20, icon: 'mdi:clock-outline', color: 'blue' },
	{ title: 'В работе', value: 50, icon: 'mdi:trending-up', color: 'purple' },
	{ title: 'Выполнено', value: 200, icon: 'mdi:check-circle-outline', color: 'green' },
	{ title: 'Просрочено', value: 10, icon: 'mdi:alert-circle-outline', color: 'red' },
];

const metrics = [
	{ title: 'Среднее время выполнения', value: '3.2 дня', icon: 'mdi:timer-outline', color: 'blue', change: '-12%', changeColor: 'green' },
	{ title: 'Заявок в работе', value: 84, icon: 'mdi:wrench-outline', color: 'purple', change: '+5%', changeColor: 'red' },
	{ title: 'Средняя нагрузка', value: '4.2', icon: 'mdi:pulse', color: 'green', change: '-8%', changeColor: 'green' },
];
</script>

<style lang="scss">
#home-page {
	display: flex;
	flex-direction: column;
	gap: 2rem;

	.hp-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1.5rem;

		.hp-heading {
			display: flex;
			align-items: center;
			gap: 1.5rem;

			.hp-logo {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				width: 5rem;
				aspect-ratio: 1;
				border-radius: 1rem;
				background: linear-gradient(135deg, #2156ff, #1d35bc);
				color: #fff;
			}

			.hp-intro {
				.hp-title {
					margin: 0;
					font-size: 2rem;
					font-weight: 600;
				}

				.hp-description {
					margin: .75rem 0 0;
					color: #64748b;
					line-height: 1.5;
				}
			}
		}

		.hp-actions {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;

			.hp-action {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				gap: .5rem;
				min-width: 8rem;
				padding: 1rem;
				border: 1px solid #bfdbfe;
				border-radius: .75rem;
				background: #fff;
				color: #1f2937;
				text-decoration: none;

				&:hover {
					background: #eff6ff;
				}

				&:focus-visible {
					outline: 2px solid #2455ff;
					outline-offset: 2px;
				}

				.hp-icon {
					color: #60a5fa;
				}

				.hp-label {
					font-size: .875rem;
				}
			}
		}
	}

	.hp-statistics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
		gap: 1.5rem;

		.base-island {
			.hp-stat {
				.hp-stat-icon {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 4rem;
					padding: 0;
					font-size: 1rem;
					aspect-ratio: 1;
					border-radius: .875rem;
				}

				.hp-value {
					margin: 1rem 0 .5rem;
					font-size: 2.25rem;
					line-height: 1.2;
				}

				.hp-label {
					margin: 0;
					color: #64748b;
				}
			}
		}
	}

	.hp-metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
		gap: 1.5rem;

		.base-island {
			.hp-metric {
				display: flex;
				align-items: center;
				gap: 1.25rem;

				.hp-metric-icon {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
					width: 3.75rem;
					padding: 0;
					font-size: 1rem;
					aspect-ratio: 1;
					border-radius: .875rem;
				}

				.hp-metric-info {
					min-width: 0;

					.hp-label {
						margin: 0;
						color: #64748b;
						font-size: .875rem;
					}

					.hp-value {
						margin: .5rem 0;
						font-size: 1.75rem;
						font-weight: 600;
					}
				}
			}
		}
	}
}
</style>
