<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits<{
	(e: "close"): void;
}>();

const modal = ref(null);

onClickOutside(modal, () => {
	emit("close");
});
</script>

<template>
	<div ref="modal" class="modal">
		<button @click="emit('close')" class="close btn">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none " xmlns="http://www.w3.org/2000/svg">
				<path d="M2 2l20 20M22 2L2 22" stroke="#fff" stroke-width="3" stroke-linecap="round" />
			</svg>
		</button>
		<p class="text">
			<slot name="text"></slot>
		</p>
		<div class="btn-wrap">
			<slot name="btn"></slot>
		</div>
	</div>
</template>

<style scoped lang="postcss">
.modal {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: hsl(0, 0%, 40%);
	min-width: 220px;
	padding: 12px;
	border-radius: 8px;
}

.close {
	position: absolute;
	right: -10px;
	top: -10px;
	padding: 2px;
	min-width: 30px;
	min-height: 30px;

	> svg {
		width: 18px;
		height: 18px;
	}
}

.text {
	font-size: 18px;
	margin: 6px 0 12px;
}

.btn-wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}
</style>
