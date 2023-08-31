<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/modules/app/storeApp";
import type { ListItem } from "@/modules/app/interfaceApp";

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

const addItem = () => {
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
</script>

<template>
	<h2>add</h2>

	<div v-if="checkId || isAdd">
		<input v-model="temp" type="number" placeholder="Укажите температуру " />

		<button @click="addItem">
			{{ props.isAdd ? "Добавить" : "Изменить" }}
		</button>
	</div>
	<span v-else>нет</span>
</template>
