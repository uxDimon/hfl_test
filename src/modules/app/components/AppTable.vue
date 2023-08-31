<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/modules/app/storeApp";

import Btn from "@/ui/btn/Btn.vue";

// router
const router = useRouter(),
	route = useRoute();

// store
const store = useAppStore();

const listRevers = computed(() => [...store.list].reverse());

// edit
const edit = (id: number): void => {
	router.push({ name: "edit", params: { id: id } });
};

// remove
const remove = (id: number): void => {
	store.list = store.list.filter((i) => i.id !== id);
};
</script>

<template>
	<h2>table</h2>

	<table>
		<tr v-for="item in listRevers" :key="item.id">
			<td>{{ item.id }}</td>
			<td>{{ item.temp }}</td>
			<td>
				<Btn @click="edit(item.id)">edit</Btn>
				<Btn @click="remove(item.id)" :is-accent="true">remove</Btn>
			</td>
		</tr>
	</table>
</template>
