<template>
	<BaseIsland class="recent-requests">
		<header class="rr-header">
			<div class="rr-heading">
				<div class="rr-icon"><BaseIcon name="mdi:clipboard-text-outline" size="1.5em"/></div>
				<h2 class="rr-title">Последние заявки</h2>
			</div>
			<NuxtLink class="rr-all" to="/applications">Все заявки →</NuxtLink>
		</header>
		<BaseTable class="rr-table" label="Последние заявки" :columns="columns" :rows="requests">
			<template v-for="column in columns" :key="column.key" #[`header.${column.key}`]="{ label }">
				<div class="rr-column"><BaseIcon :name="column.icon" size="1em"/>{{ label }}</div>
			</template>
			<template #[`cell.date`]="{ row }">
				<div class="rr-date"><BaseIcon name="mdi:calendar-blank-outline" size="1em"/><time :datetime="row.date">{{ row.dateLabel }}</time></div>
			</template>
			<template #[`cell.author`]="{ row }">
				<div class="rr-author"><span class="rr-avatar" aria-hidden="true">{{ row.initials }}</span>{{ row.author }}</div>
			</template>
			<template #[`cell.id`]="{ row }">
				<NuxtLink class="rr-number" :to="{ path: '/applications', query: { application: row.id } }">{{ row.id }}</NuxtLink>
			</template>
			<template #[`cell.subscriber`]="{ row }">
				<div class="rr-subscriber">
					<div class="rr-name">{{ row.subscriber }}</div>
					<div class="rr-address" :title="row.address"><BaseIcon name="mdi:map-marker-outline" size="1em"/><span class="rr-address-text">{{ row.address }}</span></div>
				</div>
			</template>
			<template #[`cell.stage`]="{ row }"><span class="status grey">{{ row.stage }}</span></template>
			<template #[`cell.status`]="{ row }">
				<span class="status" :class="`${statuses[row.status].color}`"><BaseIcon :name="statuses[row.status].icon" size="1em"/> {{ statuses[row.status].label }}</span>
			</template>
			<template #[`cell.sla`]="{ row }">
				<div class="rr-sla" :class="{ overdue: row.status === 'overdue' }"><BaseIcon name="mdi:timer-outline" size="1em"/>{{ row.sla }}</div>
			</template>
		</BaseTable>
	</BaseIsland>
</template>

<script lang="ts" setup>
import BaseIcon from '~/components/common/base/BaseIcon.vue';
import BaseIsland from '~/components/common/base/BaseIsland.vue';
import BaseTable from '~/components/common/base/BaseTable.vue';

const columns = [
	{ key: 'date', label: 'Дата', icon: 'mdi:calendar-blank-outline' },
	{ key: 'author', label: 'Автор', icon: 'mdi:account-outline' },
	{ key: 'id', label: '№ заявки', icon: 'mdi:clipboard-text-outline' },
	{ key: 'subscriber', label: 'Абонент и адрес', icon: 'mdi:map-marker-outline' },
	{ key: 'stage', label: 'Этап работы', icon: 'mdi:layers-outline' },
	{ key: 'status', label: 'Статус', icon: 'mdi:pulse' },
	{ key: 'sla', label: 'SLA', icon: 'mdi:timer-outline' },
];
const statuses = {
	inProgress: { label: 'В работе', color: 'purple', icon: 'mdi:wrench-outline' },
	overdue: { label: 'Просрочен', color: 'red', icon: 'mdi:alert-circle-outline' },
	completed: { label: 'Выполнено', color: 'green', icon: 'mdi:check-circle-outline' },
	new: { label: 'Новый', color: 'blue', icon: 'mdi:clock-outline' },
};

// Демонстрационные заявки до подключения API.
const requests = [
	{ id: 'NGV-2345', date: '2026-04-23', dateLabel: '23.04.2026', author: 'Курилов И.В.', initials: 'КИ', subscriber: 'Омурзаков Доолотбек', address: 'Чуйская область, Ысык-Атинский район', stage: 'Разработка проекта', status: 'inProgress', sla: '2 дня' },
	{ id: 'PRV-2344', date: '2026-04-23', dateLabel: '23.04.2026', author: 'Иванов С.А.', initials: 'ИС', subscriber: 'Исаков Азамат Бекович', address: 'г. Ош, ул. Ленина 45, кв. 12', stage: 'Оплата за СМР', status: 'inProgress', sla: '1 день' },
	{ id: 'NGV-2343', date: '2026-04-21', dateLabel: '21.04.2026', author: 'Петров А.М.', initials: 'ПА', subscriber: 'Султанова Гульнара Токтогуловна', address: 'г. Бишкек, мкр Джал 12-23', stage: 'Обработка заявления', status: 'overdue', sla: 'Просрочено 2 дня' },
	{ id: 'CNV-2342', date: '2026-04-22', dateLabel: '22.04.2026', author: 'Сидоров П.К.', initials: 'СП', subscriber: 'Токтомушев Нурбек Асанович', address: 'г. Каракол, ул. Гагарина 78', stage: 'Подключен к газу', status: 'completed', sla: 'Завершена' },
	{ id: 'PRV-2341', date: '2026-04-20', dateLabel: '20.04.2026', author: 'Курилов И.В.', initials: 'КИ', subscriber: 'Бекмуратова Айнура', address: 'г. Бишкек, ул. Абая 102, кв. 5', stage: 'Согласование проекта', status: 'new', sla: '3 дня' },
	{ id: 'NGV-2340', date: '2026-04-19', dateLabel: '19.04.2026', author: 'Смирнов Д.В.', initials: 'СД', subscriber: 'Жусупов Максат Эрикович', address: 'Чуйская область, Аламединский район', stage: 'Оплата за проект', status: 'inProgress', sla: '4 дня' },
	{ id: 'DSV-2339', date: '2026-04-23', dateLabel: '23.04.2026', author: 'Иванов С.А.', initials: 'ИС', subscriber: 'Асанова Бермет Токтосуновна', address: 'г. Бишкек, мкр Асанбай 3-45', stage: 'Согласование даты выполнения СМР', status: 'inProgress', sla: '1 день' },
] satisfies Array<Record<string, unknown> & { status: keyof typeof statuses }>;
</script>

<style lang="scss">
.recent-requests {
	padding: 0;

	.rr-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.5rem;
		background: linear-gradient(110deg, #2156ff, #153de9);
		color: #fff;

		.rr-heading {
			display: flex;
			align-items: center;
			gap: .75rem;

			.rr-icon {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				width: 2.75rem;
				aspect-ratio: 1;
				border-radius: .75rem;
				background: rgb(255 255 255 / 18%);
			}

			.rr-title {
				margin: 0;
				font-size: 1.25rem;
				font-weight: 600;
			}
		}

		.rr-all {
			color: inherit;
			font-size: .875rem;
			white-space: nowrap;
			text-decoration: none;

			&:hover { text-decoration: underline; }
			&:focus-visible { outline: 2px solid currentColor; outline-offset: .25rem; }
		}
	}

	.rr-table {
		.bt-content {
			.base-table {
				.bt-thead {
					.bt-row {
						background: #1d4bef;

						.bt-cell {
							border: 1px solid rgb(255 255 255 / 15%);
							padding: .875rem 1.25rem;
							color: #fff;
							font-size: .8rem;

							.rr-column { display: flex; align-items: center; gap: .4em; }
						}
					}
				}

				.bt-tbody {
					.bt-row {
						&:hover { background: #f8faff; }

						.bt-cell {
							padding: 1rem 1.25rem;
							border-right: 1px solid #f1f5f9;
							color: #64748b;

							.rr-date { display: flex; align-items: center; gap: .4em; white-space: nowrap; }

							.rr-author {
								display: flex;
								align-items: center;
								gap: .5rem;

								.rr-avatar {
									display: flex;
									align-items: center;
									justify-content: center;
									flex-shrink: 0;
									width: 1.75rem;
									aspect-ratio: 1;
									border-radius: 50%;
									background: #2156ff;
									color: #fff;
									font-size: .65rem;
									font-weight: 600;
								}
							}

							.rr-number {
								color: #2156ff;
								font-weight: 600;
								text-decoration: none;
								&:hover { text-decoration: underline; }
							}

							.rr-subscriber {
								.rr-name { color: #172b4d; }
								.rr-address {
									display: flex;
									align-items: center;
									gap: .25em;
									margin-top: .35rem;
									color: #94a3b8;
									font-size: .8em;

									.rr-address-text { max-width: 22em; overflow: hidden; text-overflow: ellipsis; }
								}
							}

							.rr-sla {
								display: flex;
								align-items: center;
								gap: .4em;
								&.overdue { color: #dc2626; }
							}
						}
					}
				}
			}
		}
	}
}
</style>
