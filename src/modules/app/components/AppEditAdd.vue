<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useAppStore from "@/modules/app/storeApp";
import type { ListItem } from "@/modules/app/interfaceApp";

import Btn from "@/ui/btn/Btn.vue";
import Modal from "@/components/modal/Modal.vue";

const props = defineProps<{
	isAdd?: boolean;
}>();

// router
const router = useRouter(),
	route = useRoute();

const toHome = (): void => {
	router.push({ path: "/" });
};

// store
const store = useAppStore();

// checkId
const checkId: ListItem | undefined = store.appData.list.find((i) => {
	return i.id === +route.params.id;
});

// addItem
const temp = ref<number | null>(checkId?.temp ?? null);

const editAddItem = () => {
	if (temp.value) {
		if (props.isAdd) {
			++store.appData.countId;

			store.appData.list.push({
				id: store.appData.countId,
				temp: temp.value,
			});
		} else if (checkId) {
			checkId.temp = temp.value;
		}

		toHome();
	}
};

// modal
const modalIsOpen = ref<boolean>(false);

const closeModal = (): void => {
	modalIsOpen.value = false;
};

// back
const oldTemp = temp.value;

const goBack = (): void => {
	if (oldTemp === temp.value) {
		toHome();
	} else {
		modalIsOpen.value = true;
	}
};
</script>

<template>
	<div class="add-edit-wrap">
		<h2>{{ props.isAdd ? "Добавить новую" : "Изменить" }} температуру</h2>

		<Btn @btn-click="goBack" class="add-edit-btn">Назад</Btn>

		<div v-if="checkId || isAdd" class="input-wrap">
			<label for="temp-input">Укажите температуру</label>
			<input v-model="temp" id="temp-input" type="number" />

			<Btn @btn-click="editAddItem" :disabled="!temp">
				{{ props.isAdd ? "Добавить" : "Изменить" }}
			</Btn>
		</div>

		<p v-else>
			Температуры с таким id не существует<br />
			¯\_(ツ)_/¯
		</p>
	</div>

	<Modal v-if="modalIsOpen" @close="closeModal">
		<template v-slot:text>Точно хотите назад?)</template>
		<template v-slot:btn>
			<Btn @btn-click="closeModal">Не!</Btn>
			<Btn @btn-click="toHome" :is-accent="true">Ага!</Btn>
		</template>
	</Modal>
</template>

<style scoped lang="postcss">
.add-edit-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.add-edit-btn {
	margin-bottom: 20px;
}

.input-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;

	> label {
		margin-bottom: 6px;
		text-align: center;
	}

	> input {
		text-align: center;
		border: none;
		font-size: 18px;
		border-radius: 4px;
		height: 40px;

		margin-bottom: 20px;
	}
}
</style>
