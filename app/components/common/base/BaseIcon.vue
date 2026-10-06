<template>
	<div class="base-icon">
		<Icon v-if="isRemote" :name="iconName" :size="iconSize" :style="{ color: fill }" mode="svg"/>
		<svg v-else xmlns="http://www.w3.org/2000/svg"
			:width="size ?? width"
			:height="size ?? height"
			:viewBox="viewBox"
			:fill="fill"
			:stroke="stroke"
			v-html="svgContent"
		></svg>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRuntimeConfig } from '#imports';

const props = withDefaults(defineProps<{
	name: string;
	width?: string;
	height?: string;
	vWidth?: string;
	vHeight?: string;
	size?: string;
	stroke?: string;
	fill?: string;
}>(), {
	size: '1em',
	stroke: 'none',
});

const urlPrefix = useRuntimeConfig().app.baseURL.replace(/\/$/, '');
const svgContent = ref('');
const isRemote = computed(() => props.name.includes(':') || /^(mdi|mdil)-/.test(props.name));
const iconSize = computed(() => /\d$/.test(props.size) ? `${props.size}px` : props.size);
const viewBox = computed(() => `0 0 ${props.vWidth ?? 24} ${props.vHeight ?? 24}`);
const iconName = computed(() => {
	if (props.name.includes(':')) return props.name;
	return props.name.replace(/^(mdi-light|mdil|mdi)-/, (_match, collection: string) => `${collection === 'mdil' ? 'mdi-light' : collection}:`);
});

// Локальные SVG находятся в public/icons; остальные иконки отображает Nuxt Icon.
watch(() => props.name, async (name, _previousName, onCleanup) => {
	svgContent.value = '';
	if (import.meta.server || isRemote.value) return;

	const controller = new AbortController();
	onCleanup(() => controller.abort());

	try {
		const response = await fetch(`${urlPrefix}/icons/${name}.svg`, { signal: controller.signal });
		if (!response.ok) throw new Error('Icon not found');
		svgContent.value = await response.text();
	} catch (error) {
		if (!controller.signal.aborted) console.error(`Failed to load icon: ${name}`, error);
	}
}, { immediate: true });
</script>

<style lang="scss">
.base-icon {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style>
