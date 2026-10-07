<template>
	<aside class="sidebar" :class="{ collapsed }" aria-label="Боковая панель">
		<div class="sb-decoration" aria-hidden="true">
			<BaseIcon class="sb-flame first" name="flame" size="8rem"/>
			<BaseIcon class="sb-flame second" name="flame" size="15rem"/>
			<BaseIcon class="sb-flame third" name="flame" size="11rem"/>
		</div>

		<header class="sb-header">
			<NuxtLink class="sb-brand" to="/" aria-label="ERP-Единое окно — главная">
				<div class="sb-logo">
					<BaseIcon name="flame" size="1.5em"/>
				</div>
				<div v-if="!collapsed" class="sb-brand-info">
					<span class="sb-title">ERP-Единое окно</span>
					<span class="sb-subtitle">Газпром Кыргызстан</span>
				</div>
			</NuxtLink>
			<button class="sb-toggle" type="button" :aria-label="collapsed ? 'Развернуть меню' : 'Свернуть меню'" :aria-expanded="!collapsed" aria-controls="sidebar-navigation" @click="collapsed = !collapsed">
				<BaseIcon name="mdi:menu" size="1.25em"/>
			</button>
		</header>

		<nav id="sidebar-navigation" class="sb-navigation" aria-label="Основная навигация">
			<ul class="sb-links">
				<li v-for="link in links" :key="link.link" class="sb-item">
					<NuxtLink class="sb-link" :class="{ active: route.path === link.link || (link.link !== '/' && route.path.startsWith(`${link.link}/`)) }" :to="link.link" :aria-label="link.title" :title="collapsed ? link.title : undefined">
						<BaseIcon class="sb-icon" :name="link.icon" size="1.4em"/>
						<span v-if="!collapsed" class="sb-label">{{ link.title }}</span>
					</NuxtLink>
				</li>
			</ul>
		</nav>

		<footer class="sb-footer">
			<div class="sb-user" :title="collapsed ? `${userName} — ${userRole}` : undefined">
				<div class="sb-avatar" aria-hidden="true">
					<BaseIcon name="mdi:account-outline" size="1.25em"/>
				</div>
				<div v-if="!collapsed" class="sb-user-info">
					<span class="sb-name">{{ userName }}</span>
					<span class="sb-role">{{ userRole }}</span>
				</div>
			</div>
			<button class="sb-logout" type="button" aria-label="Выйти из системы" title="Выйти из системы" @click="emit('logout')">
				<BaseIcon name="mdi:logout" size="1.25em"/>
			</button>
		</footer>
	</aside>
</template>

<script lang="ts" setup>
import BaseIcon from '~/components/common/base/BaseIcon.vue';
import { useNavigation } from '~/composables/useNavigation';

defineProps<{
	userName: string;
	userRole: string;
}>();
const collapsed = defineModel<boolean>('collapsed', { default: false });
const emit = defineEmits<{ logout: [] }>();
const route = useRoute();
const { links } = useNavigation();
</script>

<style lang="scss">
.sidebar {
	position: relative;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	width: 16rem;
	min-height: 0;
	overflow: hidden;
	background: linear-gradient(160deg, #203780, #1939b7 55%, #203780);
	color: #fff;
	transition: width .2s;

	&.collapsed {
		width: 4.5rem;

		.sb-header {
			flex-direction: column;
			gap: .5rem;
			padding-inline: .5rem;
		}

		.sb-navigation {
			.sb-links {
				.sb-item {
					.sb-link {
						justify-content: center;
						padding-inline: .5rem;
					}
				}
			}
		}

		.sb-footer {
			flex-direction: column;
			gap: .5rem;
			padding-inline: .5rem;
		}
	}

	.sb-decoration {
		position: absolute;
		inset: 0;
		pointer-events: none;

		.sb-flame {
			position: absolute;
			height: auto;
			opacity: .08;

			&.first {
				top: -.5rem;
				left: -.5rem;
			}

			&.second {
				right: -4rem;
				bottom: 15%;
				opacity: .025;
			}

			&.third {
				right: -.5rem;
				bottom: 0;
				transform: rotate(180deg);
			}
		}
	}

	.sb-header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: .5rem;
		padding: 1rem;
		border-bottom: 1px solid rgb(255 255 255 / 12%);

		.sb-brand {
			display: flex;
			align-items: center;
			gap: .75rem;
			min-width: 0;
			color: inherit;
			text-decoration: none;

			&:focus-visible {
				outline: 2px solid #ff8000;
				outline-offset: .25rem;
			}

			.sb-logo {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				width: 2.5rem;
				aspect-ratio: 1;
				border-radius: .75rem;
				background: linear-gradient(135deg, #ff8000, #f26300);
			}

			.sb-brand-info {
				display: flex;
				flex-direction: column;
				gap: .25rem;
				min-width: 0;

				.sb-title {
					font-size: .875rem;
					font-weight: 600;
					white-space: nowrap;
				}

				.sb-subtitle {
					color: #bfdbfe;
					font-size: .75rem;
					white-space: nowrap;
				}
			}
		}

		.sb-toggle {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			padding: .25rem;
			border: 0;
			border-radius: .25rem;
			background: transparent;
			color: inherit;
			cursor: pointer;

			&:hover {
				background: rgb(255 255 255 / 12%);
			}

			&:focus-visible {
				outline: 2px solid #ff8000;
				outline-offset: 2px;
			}
		}
	}

	.sb-navigation {
		position: relative;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		padding-block: 1rem;
		scrollbar-width: thin;
		scrollbar-color: #ffffff40 transparent;

		.sb-links {
			margin: 0;
			padding: 0;
			list-style: none;

			.sb-item {
				.sb-link {
					display: flex;
					align-items: center;
					gap: .75rem;
					min-height: 2.75rem;
					padding: .625rem 1rem;
					border-left: .25rem solid transparent;
					color: inherit;
					font-size: .875rem;
					line-height: 1.4;
					text-decoration: none;
					transition: background-color .15s;

					&:hover {
						background: rgb(255 255 255 / 8%);
					}

					&.active {
						border-left-color: #ff8000;
						background: #1744e8;
					}

					&:focus-visible {
						outline: 2px solid #ff8000;
						outline-offset: -2px;
					}

					.sb-icon {
						flex-shrink: 0;
					}

					.sb-label {
						white-space: nowrap;
					}
				}
			}
		}
	}

	.sb-footer {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: .75rem;
		padding: 1rem;
		border-top: 1px solid rgb(255 255 255 / 12%);
		background: rgb(0 0 0 / 5%);

		.sb-user {
			display: flex;
			align-items: center;
			gap: .75rem;
			min-width: 0;

			.sb-avatar {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;
				width: 2rem;
				aspect-ratio: 1;
				border-radius: 50%;
				background: #ff8000;
			}

			.sb-user-info {
				display: flex;
				flex-direction: column;
				gap: .25rem;
				min-width: 0;

				.sb-name {
					font-size: .875rem;
				}

				.sb-role {
					color: #bfdbfe;
					font-size: .75rem;
				}
			}
		}

		.sb-logout {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
			padding: .25rem;
			border: 0;
			border-radius: .25rem;
			background: transparent;
			color: inherit;
			cursor: pointer;

			&:hover {
				background: rgb(255 255 255 / 12%);
			}

			&:focus-visible {
				outline: 2px solid #ff8000;
				outline-offset: 2px;
			}
		}
	}
}
</style>
