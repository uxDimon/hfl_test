<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import useAppStore from "@/modules/app/storeApp";

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
	store.addToLocalStorage();
	closeModal();
};
</script>

<template>
	<div class="table-wrap">
		<h2>Список показаний</h2>

		<RouterLink to="/add" class="btn table-btn">Добавить показания</RouterLink>

		<table>
			<tr class="tr-head">
				<th style="width: 50px">id</th>
				<th>Температура</th>
				<th></th>
			</tr>
			<tr v-for="item in listRevers" :key="item.id">
				<td>{{ item.id }}</td>
				<td>{{ item.temp }} °C</td>
				<td>
					<div class="btn-wrap">
						<Btn @btn-click="edit(item.id)">Изменить</Btn>
						<Btn
							@btn-click="
								() => {
									removeId = item.id;
									modalIsOpen = true;
								}
							"
							:is-accent="true"
							>Удалить</Btn
						>
					</div>
				</td>
			</tr>
		</table>
	</div>

	<Modal v-if="modalIsOpen" @close="closeModal">
		<template v-slot:text>Точно удалить?</template>
		<template v-slot:btn>
			<Btn @btn-click="closeModal">Не!</Btn>
			<Btn @btn-click="removeListItem(removeId)" :is-accent="true">Ага!</Btn>
		</template>
	</Modal>
</template>

<style scoped lang="postcss">
.table-wrap {
	display: flex;
	align-items: center;
	flex-direction: column;
}

.table-btn {
	margin-bottom: 20px;
}

table {
	border: 1px solid hsl(0, 0%, 50%);
	border-collapse: collapse;

	td,
	th {
		border: 1px solid hsl(0, 0%, 50%);
		padding: 4px;
	}

	th {
		font-size: 12px;
	}
}

.btn-wrap {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10px;
}
</style>
