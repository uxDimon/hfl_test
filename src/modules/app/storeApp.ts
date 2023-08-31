import { ref } from "vue";
import { defineStore } from "pinia";
import type { ListItem } from "@/modules/app/interfaceApp";

export const useAppStore = defineStore("app", () => {
	const countId = ref(3),
		list = ref<ListItem[]>([
			{
				id: 1,
				temp: 20,
			},
			{
				id: 2,
				temp: 22,
			},
			{
				id: 3,
				temp: 24,
			},
		]);

	return { countId, list };
});
