<template>
	<div class="base-tabs">
		<p v-if="label" class="bt-label">{{ label }}</p>
		<div ref="tabList" class="bt-tabs" role="tablist" :aria-label="label || 'Категории'">
			<button v-for="(item, index) in items" :id="`${id}-tab-${index}`" :key="item.key" class="bt-tab" :class="{ selected: model === item.key }" type="button" role="tab" :aria-selected="model === item.key" :aria-controls="$slots.default ? `${id}-panel` : undefined" :tabindex="model === item.key ? 0 : -1" :style="{ backgroundColor: model === item.key ? item.color : undefined }" @click="model = item.key" @keydown="onKeydown($event, index)">
				<BaseIcon v-if="item.icon" :name="item.icon" size="1.3em"/>
				<span class="bt-title">{{ item.value }}</span>
				<span v-if="item.badge !== undefined" class="bt-badge">{{ item.badge }}</span>
			</button>
		</div>
		<div v-if="$slots.default" :id="`${id}-panel`" class="bt-content" role="tabpanel" :aria-labelledby="`${id}-tab-${items.findIndex(item => item.key === model)}`" tabindex="0">
			<slot/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import BaseIcon from './BaseIcon.vue';

const props = withDefaults(defineProps<{
	items: { key: string | number; value: string; icon?: string; color?: string; badge?: string | number }[];
	label?: string;
	autoselect?: boolean;
}>(), { autoselect: true });

const model = defineModel<string | number>();
const id = useId();
const tabList = ref<HTMLElement | null>(null);

watch(() => props.items, items => {
	if (props.autoselect && model.value === undefined && items.length) model.value = items[0]!.key;
}, { immediate: true });

function onKeydown(event: KeyboardEvent, index: number) {
	let nextIndex = index;
	switch (event.key) {
		case 'ArrowRight': nextIndex = (index + 1) % props.items.length; break;
		case 'ArrowLeft': nextIndex = (index - 1 + props.items.length) % props.items.length; break;
		case 'Home': nextIndex = 0; break;
		case 'End': nextIndex = props.items.length - 1; break;
		default: return;
	}
	event.preventDefault();
	model.value = props.items[nextIndex]!.key;
	nextTick(() => tabList.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[nextIndex]?.focus());
}
</script>

<style lang="scss">
.base-tabs {
	.bt-label {
		margin: 0 0 .75rem;
		color: #475569;
		font-size: .875rem;
	}

	.bt-tabs {
		display: flex;
		gap: .5rem;
		border-bottom: 1px solid #e2e8f0;
		overflow-x: auto;

		.bt-tab {
			display: inline-flex;
			align-items: center;
			gap: .625rem;
			padding: .875rem 1.5rem;
			border: 0;
			border-radius: .75rem .75rem 0 0;
			background: #f3f4f6;
			color: #475569;
			font-size: 1rem;
			font-weight: 500;
			white-space: nowrap;
			cursor: pointer;
			transition: background-color .15s;

			&:hover {
				background: #e2e8f0;
			}

			&.selected {
				background: #2156ff;
				color: #fff;

				&:hover {
					background: #153de9;
				}
			}

			&:focus-visible {
				outline: 2px solid #ff8000;
				outline-offset: -3px;
			}

			.bt-badge {
				padding: .15em .5em;
				border-radius: .25rem;
				background: rgb(255 255 255 / 30%);
				font-size: .8em;
			}
		}
	}

	.bt-content {
		padding-top: 1.5rem;

		&:focus-visible {
			outline: 2px solid #2455ff;
			outline-offset: .25rem;
		}
	}
}
</style>
