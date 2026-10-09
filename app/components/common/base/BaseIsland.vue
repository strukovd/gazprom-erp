<template>
	<div class="base-island">
		<h4 v-if="title" class="bi-title">
			<BaseIcon v-if="prependIcon" class="bi-icon" :name="prependIcon" size="1.2em"/>
			<span>{{ title }}</span>
		</h4>
		<slot/>
	</div>
</template>

<script lang="ts" setup>
import BaseIcon from './BaseIcon.vue';

defineProps<{
	title?: string;
	prependIcon?: string;
}>();
</script>

<style lang="scss">
.base-island {
	min-width: 0;
	padding: 1.5rem;
	border: 1px solid #e5e5e5;
	border-radius: .75rem;
	background: #fff;
	box-shadow: 0 .25rem .75rem rgb(15 23 42 / 6%);
	overflow: auto;

	.bi-title {
		display: flex;
		align-items: center;
		gap: .4em;
		margin: 0 0 1rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #eff6ff;
		color: #172b4d;
		font-size: 1rem;
		font-weight: 600;

		.bi-icon {
			color: #2563ea;
		}
	}
}
</style>
