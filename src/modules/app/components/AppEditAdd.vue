<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/modules/app/storeApp";
import type { ListItem } from "@/modules/app/interfaceApp";

import Btn from "@/ui/btn/Btn.vue";
import Modal from "@/components/modal/Modal.vue";

const props = defineProps<{
	isAdd?: boolean;
}>();

// router
const router = useRouter(),
	route = useRoute();

// store
const store = useAppStore();

// checkId
const checkId: ListItem | undefined = store.list.find((i) => {
	return i.id === +route.params.id;
});

// addItem
const temp = ref<number | null>(checkId?.temp ?? null);

const editAddItem = () => {
	if (temp.value) {
		if (props.isAdd) {
			++store.countId;
			store.list.push({
				id: store.countId,
				temp: temp.value,
			});
		} else if (checkId) {
			checkId.temp = temp.value;
		}

		router.push({ path: "/" });
	}
};

// modal
const modalIsOpen = ref<boolean>(false);
const closeModal = (): void => {
	modalIsOpen.value = false;
};
</script>

<template>
	<h2>add</h2>

	<div v-if="checkId || isAdd">
		<input v-model="temp" type="number" placeholder="Укажите температуру " />

		<Btn
			@click="
				() => {
					modalIsOpen = true;
				}
			"
			:disabled="!temp"
		>
			{{ props.isAdd ? "Добавить" : "Изменить" }}
		</Btn>
	</div>
	<span v-else>нет</span>

	<Modal v-if="modalIsOpen" @close="closeModal">
		<template v-slot:text>Точно хотите {{ props.isAdd ? "добавить новую" : "изменить" }} температуру?))</template>
		<template v-slot:btn>
			<Btn @btn-click="closeModal">Не!</Btn>
			<Btn @btn-click="editAddItem" :is-accent="true">Ага!</Btn>
		</template>
	</Modal>
</template>
