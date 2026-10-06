<template>
	<button
		type="button"
		class="base-button"
		:class="[variant, { 'disabled': isDisabled, 'loading': loading }]"
		:disabled="isDisabled"
		:style="{
			color: !isDisabled && variant === 'secondary' && color ? color : '',
			borderColor: !isDisabled && variant === 'secondary' && color ? color : '',
			background: !isDisabled && variant !== 'secondary' && color ? color : ''
		}"
	>
		<BaseIcon v-if="loading" class="loading-icon" fill="currentColor" size="1.2em" name="mdi-loading"/>
		<BaseIcon v-else-if="prependIcon" fill="currentColor" size="1.2em" :name="prependIcon"/>
		<div class="bb-text"><slot/></div>
		<BaseIcon v-if="appendIcon" fill="currentColor" size="1.2em" :name="appendIcon"/>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseIcon from '~/components/common/base/BaseIcon.vue';

export default defineComponent({
	name: 'BaseButton',
	components: { BaseIcon },
	props: {
		prependIcon: String,
		appendIcon: String,
		disabled: { type: Boolean, default: false },
		loading: { type: Boolean, default: false },
		color: String,
		variant: {
			type: String as () => 'primary' | 'secondary' | 'outlined' | 'light',
			default: 'primary'
		},
	},
	computed: {
		isDisabled(): boolean {
			return this.disabled || this.loading;
		},
	},
	methods: {},
});
</script>

<style lang="scss">
.base-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: .5em;
	min-height: 3em;
	padding: .75em 1em;
	border: 1px solid transparent;
	border-radius: .625rem;
	font-size: 1rem;
	line-height: 1.4;
	user-select: none;
	transition: background .15s, box-shadow .15s, opacity .15s;

	&.disabled {
		background: #f1f5f9;
		color: #94a3b8;
		border-color: #e2e8f0;
		box-shadow: none;
		cursor: not-allowed;
	}

	&:not(.disabled) {
		cursor: pointer;

		&.primary {
			background: linear-gradient(110deg, #2156ff, #153de9);
			color: #fff;
			box-shadow: 0 .375rem .75rem rgb(15 23 42 / 12%);

			&:hover {
				background: #153de9;
			}
		}

		&.secondary {
			background: rgba(9, 30, 66, .08);
			color: #344563;
		}

		&.outlined {
			background: #fff;
			color: #114bc8;
			border-color: #2563ea;
		}

		&.light {
			background: #e9effd;
			color: #2563ea;
			border-color: #a8c1f7;
		}

		&:hover {
			opacity: .9;
		}
	}

	&:focus-visible {
		outline: 2px solid #2455ff;
		outline-offset: 3px;
	}

	.bb-text {
		min-width: 0;
		font-weight: 500;
		text-align: center;
	}

	.loading-icon {
		animation: base-button-loading 1s linear infinite;
	}
}

@keyframes base-button-loading {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>
