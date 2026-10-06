<template>
	<div v-bind="{ class: $attrs.class, style: $attrs.style }" class="base-text-box" :class="{ 'invalid': error, 'disabled': disabled }" @keydown.enter="onSubmit" >
		<label class="tb-label">
			<div class="text-box-wrapper">
				<header class="tb-header">
					<div v-if="label" class="tb-caption-container">
						<span class="tb-caption">{{ label }}</span>
					</div>
					<div v-if="error" class="tb-error-container">
						<span class="tb-error-message">{{ error }}</span>
					</div>
				</header>

				<div class="text-box-area">
					<BaseIcon v-if="prependIcon" class="prepend-icon" size="1.4em" :name="prependIcon"/>
					<input v-bind="{ ...$attrs, class: undefined, style: undefined }" ref="input" class="tb-control" :aria-invalid="!!error" :disabled="disabled" :name="name" :type="type === 'password' ? (masked ? 'password' : 'text') : type" :placeholder="placeholder" :autofocus="autofocus" :value="valueProxy" @input="onInput">
					<button v-if="type === 'password'" class="tb-visibility" type="button" :disabled="disabled" :aria-label="masked ? 'Показать пароль' : 'Скрыть пароль'" :aria-pressed="!masked" @click="toggleMask">
						<BaseIcon size="1.4em" :name="masked ? 'mdi-eye-off' : 'mdi-eye'"/>
					</button>
					<BaseIcon v-else-if="appendIcon" class="append-icon" size="1.4em" :name="appendIcon"/>
					<BaseButton v-if="button" :disabled="disabled" variant="secondary" @click="onSubmit">{{ button }}</BaseButton>
				</div>
			</div>
		</label>
	</div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import BaseButton from '~/components/common/base/BaseButton.vue';
import BaseIcon from '~/components/common/base/BaseIcon.vue';

export default defineComponent({
	// TODO: добавить .lazy директиву
	name: 'BaseTextBox',
	inheritAttrs: false,
	components: { BaseButton, BaseIcon },
	emits: ['update:modelValue', 'submit'],
	props: {
		modelValue: {
			type: [String, Number] as PropType<string | number | undefined>,
		},
		name: String,
		label: String,
		prependIcon: String,
		appendIcon: String,
		autofocus: Boolean,
		disabled: Boolean,
		placeholder: String,
		type: {
			type: String as () => 'text' | 'password' | 'color'
				| 'date' | 'datetime'
				| 'datetime-local' | 'month' | 'tel'
				| 'time' | 'url' | 'week' | 'email' | 'number',
			default: 'text'
		},
		button: String,
		error: String as () => string | null | undefined,
		mask: String // пример: "+996 (###) ## ## ##" (# — цифра, A — буква, * — любой символ)
	},
	data() {
		return {
			innerValue: (this.modelValue ?? '') as string | number,
			masked: false
		};
	},
	computed: {
		// Универсальный прокси: если передан v-model — читаем/пишем через проп/эмит,
		// иначе — работаем с внутренним состоянием.
		valueProxy: {
			get(): string | number {
				return this.modelValue !== undefined ? this.modelValue : this.innerValue;
			},
			set(v: string | number) {
				this.innerValue = v;
				// Всегда эмитим обновление, чтобы родитель получил значение даже при стартовом undefined.
				this.$emit('update:modelValue', v);
			}
		}
	},
	methods: {
		focus() {
			(this.$refs.input as HTMLInputElement | undefined)?.focus();
		},
		applyMask(value: string) {
			if (!this.mask) return value;

			const mask = this.mask;
			const input = value ?? '';
			let maskedValue = '';
			let maskIndex = 0;
			let inputIndex = 0;

			while (maskIndex < mask.length && inputIndex < input.length) {
				const maskChar = mask[maskIndex];
				const inputChar: string = input[inputIndex]!;

				if (maskChar === '#') {
					if (/\d/.test(inputChar)) {
						maskedValue += inputChar;
						maskIndex++;
					}
					inputIndex++;
				} else if (maskChar === 'A') {
					if (/[a-zA-Z]/.test(inputChar)) {
						maskedValue += inputChar;
						maskIndex++;
					}
					inputIndex++;
				} else if (maskChar === '*') {
					maskedValue += inputChar;
					maskIndex++;
					inputIndex++;
				} else {
					maskedValue += maskChar; // Статический символ маски (скобки, пробелы и т.п.)
					if (inputChar === maskChar) {
						inputIndex++;
					}
					maskIndex++;
				}
			}

			return maskedValue;
		},
		onSubmit(event: KeyboardEvent) {
			if (this.disabled) return;
			const valueCopy = this.modelValue !== undefined ? this.modelValue : this.innerValue;
			this.$emit('submit', valueCopy, event);
		},
		onInput(event: Event) {
			if (this.disabled) return;
			const val = (event.target as HTMLInputElement)?.value ?? '';
			const masked = this.mask ? this.applyMask(val) : val;
			if (this.mask && event.target) {
				(event.target as HTMLInputElement).value = masked;
			}

			this.valueProxy = this.type === 'number' && !this.mask ? Number(masked) : masked;
		},
		toggleMask() {
			if (this.disabled) return;
			this.masked = !this.masked;
		}
	},
	created() {
		this.masked = this.type === 'password';
	},
	mounted() {
		if (this.autofocus) {
			this.$nextTick(() => {
				this.focus();
				setTimeout(() => this.focus());
			});
		}
	},
	watch: {
		// Если родитель всё же начал менять modelValue — синхронизируем стартовое внутреннее значение
		modelValue(newVal) {
			if (newVal !== undefined) {
				const raw = typeof newVal === 'number' ? String(newVal) : (newVal as string);
				this.innerValue = this.mask ? this.applyMask(raw) : (newVal as string | number);
			}
		}
	}
	});
</script>

<style lang="scss">
.base-text-box {
	min-width: 0;
	color: #1f2937;

	.tb-label {
		display: block;

		.text-box-wrapper {
			.tb-header {
				display: flex;
				align-items: start;
				justify-content: space-between;
				gap: .5em;
				font-size: .875rem;
				line-height: 1.4;

				.tb-caption-container {
					flex: 1;
					margin-bottom: .625rem;

					.tb-caption {
						color: #475569;
						font-weight: 400;
					}
				}

				.tb-error-container {
					margin-bottom: .625rem;
					color: #dc2626;
					text-align: right;
				}
			}

			.text-box-area {
				display: flex;
				align-items: center;
				gap: .625em;
				min-height: 3.125em;
				padding: .25em .75em;
				border: 1px solid #cbd5e1;
				border-radius: .625rem;
				background: #fff;
				font-size: 1rem;
				line-height: 1.4;
				transition: border-color .15s, box-shadow .15s;

				&:focus-within {
					border-color: #2455ff;
					box-shadow: 0 0 0 .1875rem rgb(36 85 255 / 12%);
				}

				.prepend-icon,
				.append-icon {
					flex-shrink: 0;
					color: #98a2b3;
				}

				.tb-control {
					flex: 1;
					width: 100%;
					min-width: 0;
					padding: .5em 0;
					border: 0;
					outline: none;
					background: transparent;
					color: inherit;
					font: inherit;

					&::placeholder {
						color: #969ba5;
						opacity: 1;
					}
				}

				.tb-visibility {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
					padding: .25em;
					border: 0;
					border-radius: .25rem;
					background: transparent;
					color: #98a2b3;
					cursor: pointer;

					&:hover {
						color: #2455ff;
					}

					&:focus-visible {
						outline: 2px solid #2455ff;
						outline-offset: 2px;
					}

					&:disabled {
						color: #cbd5e1;
						cursor: not-allowed;
					}
				}
			}
		}
	}

	&.invalid {
		.tb-label {
			.text-box-wrapper {
				.text-box-area {
					border-color: #dc2626;

					&:focus-within {
						box-shadow: 0 0 0 .1875rem rgb(220 38 38 / 12%);
					}
				}
			}
		}
	}

	&.disabled {
		.tb-label {
			.text-box-wrapper {
				.text-box-area {
					background: #f8fafc;
					color: #64748b;
					box-shadow: none;

					.prepend-icon,
					.append-icon {
						color: #cbd5e1;
					}

					.tb-control {
						cursor: not-allowed;
					}
				}
			}
		}
	}
}
</style>
