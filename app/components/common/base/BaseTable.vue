<template>
	<div class="base-table-wrapper">
		<component
			:is="pageable ? BasePageable : 'div'"
			class="bt-content"
			v-bind="pageableProps"
			@update:page="changePage"
		>
			<table class="base-table" :aria-label="label" :aria-busy="loading">
				<thead class="bt-thead">
					<tr class="bt-row">
						<th
							v-for="column in columns"
							:key="column.key"
							scope="col"
							:class="['bt-cell', 'head', column.headerClass]"
							:style="{ width: column.width }"
						>
							<slot :name="`header.${column.key}`" :column="column" :label="column.label">
								{{ column.label }}
							</slot>
						</th>
					</tr>
				</thead>

				<tbody class="bt-tbody">
					<!-- Загрузка -->
					<tr v-if="loading" class="bt-row">
						<td class="bt-cell state" :colspan="columns.length">
							<slot name="loading">Загрузка...</slot>
						</td>
					</tr>
					<!-- Нет данных -->
					<tr v-else-if="!rows.length" class="bt-row">
						<td class="bt-cell state" :colspan="columns.length">
							<slot name="empty">Нет данных</slot>
						</td>
					</tr>
					<!-- Есть данные (строки) -->
					<tr
						v-for="(row, rowIndex) of rows"
						v-else
						:key="getRowKey(row, rowIndex)"
						class="bt-row"
						:style="getRowStyle(row, rowIndex)"
						@click="emit('row:click', row, rowIndex)"
					>
						<td v-for="column of columns" :key="column.key" :class="['bt-cell', column.cellClass]">
							<slot
								:name="`cell.${column.key}`"
								:row="row"
								:value="getValue(row, column.key)"
								:column="column"
								:index="rowIndex"
								:row-index="rowIndex"
							>
								{{ getValue(row, column.key) }}
							</slot>
						</td>
					</tr>
				</tbody>
			</table>
		</component>
	</div>
</template>

<script lang="ts" setup generic="TableRow extends Record<string, unknown>">
import BasePageable from './BasePageable.vue';

type TableColumn = {
	key: string;
	label: string;
	width?: string;
	headerClass?: string | string[] | Record<string, boolean>;
	cellClass?: string | string[] | Record<string, boolean>;
};

type TableRowStyle = Record<string, string | number> | ((row: TableRow, index: number) => Record<string, string | number>);

const props = withDefaults(defineProps<{
	label?: string;
	columns: TableColumn[];
	rows: TableRow[];
	loading?: boolean;
	rowKey?: string | ((row: TableRow, index: number) => string | number);
	rowStyle?: TableRowStyle;
	pageable?: boolean;
	page?: number;
	limit?: number;
	total?: number;
}>(), {
	label: undefined,
	rowStyle: undefined,
	page: undefined,
	total: undefined,
	loading: false,
	rowKey: 'id',
	pageable: false,
	limit: 10,
});
const emit = defineEmits<{
	'row:click': [row: TableRow, index: number];
	'update:page': [page: number];
	'page:change': [page: number];
}>();
const internalPage = ref(props.page ?? 1);

const currentPage = computed(() => props.page ?? internalPage.value);
const pageableProps = computed(() => props.pageable
	? {
		page: currentPage.value,
		limit: props.limit,
		total: props.total ?? props.rows.length,
	}
	: {}
);

function getValue(row: TableRow, key: string): unknown {
	// Поддержка вложенных ключей через точку, например "user.name"
	return key.split('.').reduce<unknown>((value, path) => {
		if(value && typeof value === 'object' && path in value) {
			return (value as Record<string, unknown>)[path];
		}

		return undefined;
	}, row) ?? '';
}

function getRowKey(row: TableRow, index: number): string | number {
	if(typeof props.rowKey === 'function') {
		return props.rowKey(row, index);
	}

	const value = getValue(row, props.rowKey);

	if((typeof value === 'string' && value !== '') || typeof value === 'number') {
		return value;
	}

	return index;
}

function getRowStyle(row: TableRow, index: number) {
	if(typeof props.rowStyle === 'function') {
		return props.rowStyle(row, index);
	}

	return props.rowStyle ?? {};
}

function changePage(page: number) {
	internalPage.value = page;
	emit('update:page', page);
	emit('page:change', page);
}
</script>

<style lang="scss">
.base-table-wrapper {
	width: 100%;
	min-width: 0;
	overflow-x: auto;

	.bt-content {
		.base-table {
			width: 100%;
			border-collapse: collapse;
			font-size: .875rem;

			.bt-thead {
				.bt-row {
					border-bottom: 1px solid #e5e5e5;

					.bt-cell {
						padding: .75rem;
						text-align: left;
						vertical-align: middle;
						white-space: nowrap;
						color: #525252;
						font-weight: 700;
					}
				}
			}

			.bt-tbody {
				.bt-row {
					border-bottom: 1px solid #f1f5f9;

					&:last-child {
						border-bottom: none;
					}

					.bt-cell {
						padding: .75rem;
						text-align: left;
						vertical-align: middle;
						white-space: nowrap;

						&.state {
							padding: 1.5rem;
							text-align: center;
							color: #64748b;
						}
					}
				}
			}
		}
	}
}
</style>
