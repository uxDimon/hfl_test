<script setup lang="ts">
defineProps<{
	disabled?: boolean;
	isAccent?: boolean;
}>();
</script>

<template>
	<button @click="$emit('click')" :disabled="disabled" :class="{ _accent: isAccent }" class="btn">
		<slot></slot>
	</button>
</template>

<style lang="postcss">
a,
button {
	&.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		min-height: 40px;
		min-width: 40px;
		padding: 2px 16px;
		border-radius: 6px;
		background: var(--color-main);
		font-family: var(--main-font);
		font-weight: 600;
		font-size: 16px;
		line-height: 120%;
		color: var(--color-text);
		text-decoration: none;
		cursor: pointer;

		transition: background 100ms ease-in-out;

		&:hover {
			background: var(--color-main-hover);
		}

		&._accent {
			background: var(--color-accent);

			&:hover {
				background: var(--color-accent-hover);
			}
		}

		&:disabled {
			background: hsl(0, 0%, 40%);
			color: hsl(0, 0%, 60%);
			cursor: default;
		}
	}
}
</style>
