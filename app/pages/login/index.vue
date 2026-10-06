<template>
	<main class="login-page">
		<div class="lp-decoration" aria-hidden="true">
			<img class="lp-flame first" src="/icons/flame.svg" alt="">
			<img class="lp-flame second" src="/icons/flame.svg" alt="">
		</div>

		<div class="lp-content">
			<header class="lp-brand">
				<div class="lp-logo">
					<img class="lp-icon" src="/icons/flame.svg" alt="">
				</div>
				<h1 class="lp-title">ERP-Единое окно</h1>
				<p class="lp-subtitle">Газпром Кыргызстан</p>
			</header>

			<section class="lp-card" aria-labelledby="login-title">
				<h2 id="login-title" class="lp-title">Вход в систему</h2>
				<form class="lp-form" @submit.prevent="signIn">
					<BaseTextBox v-model="login" name="username" label="Логин" prepend-icon="mdi-account-outline" autocomplete="username" placeholder="Введите логин" required/>
					<BaseTextBox v-model="password" name="password" label="Пароль" type="password" prepend-icon="mdi-lock-outline" autocomplete="current-password" placeholder="Введите пароль" required/>

					<div class="lp-options">
						<label class="lp-remember">
							<input v-model="rememberMe" class="lp-checkbox" type="checkbox" name="remember">
							<span>Запомнить меня</span>
						</label>
						<button class="lp-recovery" type="button" @click="notice = 'Для восстановления пароля обратитесь в Отдел маркетинга и развития бизнеса.'">Забыли пароль?</button>
					</div>

					<p v-if="notice" class="lp-notice" role="status">{{ notice }}</p>
					<BaseButton type="submit" prepend-icon="flame">Войти в систему</BaseButton>
				</form>

				<footer class="lp-footer">
					<p class="lp-caption">Корпоративная система управления</p>
					<p class="lp-version">v2.0 © 2026 Газпром Кыргызстан</p>
				</footer>
			</section>

			<p class="lp-support">Возникли проблемы со входом? <span class="lp-contact">Обратитесь в Отдел маркетинга и развития бизнеса</span></p>
		</div>
	</main>
</template>

<script lang="ts" setup>
import BaseButton from '~/components/common/base/BaseButton.vue';
import BaseTextBox from '~/components/common/base/BaseTextBox.vue';

definePageMeta({ layout: false });
useHead({
	title: 'Вход в систему — ERP-Единое окно',
	htmlAttrs: { lang: 'ru' },
});

const login = ref('');
const password = ref('');
const rememberMe = ref(false);
const notice = ref('');

function signIn() {
	if (!login.value.trim()) {
		notice.value = 'Введите логин.';
		return;
	}

	navigateTo('/', { replace: true });

	// notice.value = 'Вход пока недоступен. Обратитесь в Отдел маркетинга и развития бизнеса.';
}
</script>

<style lang="scss">
.login-page {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100svh;
	padding: clamp(2rem, 7vh, 5rem) clamp(1rem, 3vw, 1.5rem);
	overflow: hidden;
	background: linear-gradient(135deg, #203780 0%, #1939b7 50%, #203780 100%);

	.lp-decoration {
		position: absolute;
		inset: 0;
		pointer-events: none;

		.lp-flame {
			position: absolute;
			width: clamp(12rem, 30vw, 20rem);
			height: auto;
			opacity: .1;
			filter: brightness(0) invert(1);

			&.first {
				top: 10%;
				left: 12%;
			}

			&.second {
				right: 12%;
				bottom: 6%;
				width: clamp(14rem, 36vw, 24rem);
				transform: rotate(180deg);
			}
		}
	}

	.lp-content {
		position: relative;
		width: 100%;
		max-width: 28rem;
		text-align: center;

		.lp-brand {
			margin-bottom: 2.25rem;
			color: #fff;

			.lp-logo {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 6rem;
				height: 6rem;
				margin: 0 auto 1.5rem;
				border-radius: 1rem;
				background: linear-gradient(135deg, #ff8000, #f26300);

				.lp-icon {
					width: 3.5rem;
					height: 3.5rem;
					filter: brightness(0) invert(1);
				}
			}

			.lp-title {
				margin: 0;
				font-size: clamp(1.75rem, 3vw, 2.25rem);
				font-weight: 500;
				line-height: 1.2;
			}

			.lp-subtitle {
				margin: 0.625rem 0 0;
				color: #bfdbfe;
				font-size: 1.125rem;
				line-height: 1.5rem;
			}
		}

		.lp-card {
			padding: clamp(1.25rem, 4vw, 2rem);
			border-radius: 1rem;
			background: #fff;
			box-shadow: 0 1rem 2.5rem rgb(12 28 83 / 12%);

			.lp-title {
				margin: 0 0 1.625rem;
				font-size: 1.5rem;
				font-weight: 500;
				line-height: 1.875rem;
			}

			.lp-form {
				display: flex;
				flex-direction: column;
				gap: 1rem;
				text-align: left;

				.lp-options {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					gap: 0.75rem;
					font-size: 0.875rem;
					line-height: 1.25rem;

					.lp-remember {
						display: flex;
						align-items: center;
						gap: 0.5rem;
						color: #475569;
						cursor: pointer;

						.lp-checkbox {
							width: 0.875rem;
							height: 0.875rem;
							margin: 0;
							accent-color: #2455ff;
						}
					}

					.lp-recovery {
						padding: 0;
						border: 0;
						background: transparent;
						color: #2455ff;
						cursor: pointer;

						&:hover {
							text-decoration: underline;
						}

						&:focus-visible {
							outline: 2px solid #2455ff;
							outline-offset: 0.25rem;
						}
					}
				}

				.lp-notice {
					margin: 0;
					padding: 0.75rem;
					border-radius: 0.5rem;
					background: #eff6ff;
					color: #1e40af;
					font-size: 0.875rem;
					line-height: 1.25rem;
				}

			}

			.lp-footer {
				margin-top: 1.5rem;
				padding-top: 1.5rem;
				border-top: 1px solid #e2e8f0;
				font-size: 0.75rem;
				line-height: 1.125rem;

				.lp-caption {
					margin: 0;
					color: #8993a4;
				}

				.lp-version {
					margin: 2px 0 0;
					color: #a0aec0;
				}
			}
		}

		.lp-support {
			margin: 1.5rem 0 0;
			color: #bfdbfe;
			font-size: 0.875rem;
			line-height: 1.25rem;

			.lp-contact {
				color: #fff;
			}
		}
	}
}
</style>
