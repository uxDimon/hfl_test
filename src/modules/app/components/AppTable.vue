<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/modules/app/storeApp";

import Btn from "@/ui/btn/Btn.vue";
import Modal from "@/components/modal/Modal.vue";

// router
const router = useRouter();

// store
const store = useAppStore();

const listRevers = computed(() => [...store.list].reverse());

// edit
const edit = (id: number): void => {
	router.push({ name: "edit", params: { id: id } });
};

// modal
const modalIsOpen = ref<boolean>(false);
const closeModal = (): void => {
	modalIsOpen.value = false;
};

// remove
let removeId: number;
const removeListItem = (id: number): void => {
	store.list = store.list.filter((i) => i.id !== id);
	closeModal();
};
</script>

<template>
	<h2>table</h2>

	<table>
		<tr v-for="item in listRevers" :key="item.id">
			<td>{{ item.id }}</td>
			<td>{{ item.temp }}</td>
			<td>
				<Btn @btn-click="edit(item.id)">edit</Btn>
				<Btn
					@btn-click="
						() => {
							removeId = item.id;
							modalIsOpen = true;
						}
					"
					:is-accent="true"
					>remove</Btn
				>
			</td>
		</tr>
	</table>

	<Modal v-if="modalIsOpen" @close="closeModal">
		<template v-slot:text>Точно удалить?</template>
		<template v-slot:btn>
			<Btn @btn-click="closeModal">Не!</Btn>
			<Btn @btn-click="removeListItem(removeId)" :is-accent="true">Ага!</Btn>
		</template>
	</Modal>
</template>

<style scoped lang="postcss"></style>
