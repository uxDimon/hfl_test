import { ref } from "vue";
import { defineStore } from "pinia";
import type { ListItem } from "@/modules/app/interfaceApp";

const LOCAL_STORAGE_NAME = "appData";

export const useAppStore = defineStore("app", () => {
	const countId = ref<number>(3),
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

	// localStorage
	let localApp = window.localStorage.getItem(LOCAL_STORAGE_NAME);
	if (localApp) {
		const appData: { countId: number; list: ListItem[] } = JSON.parse(localApp);

		countId.value = appData.countId;
		list.value = appData.list;
	}

	// Придётся вызывать при каждом изменении эту функцию, зато больше контроля)
	const addToLocalStorage = (): void => {
		window.localStorage.setItem(
			LOCAL_STORAGE_NAME,
			JSON.stringify({
				countId: countId.value,
				list: list.value,
			})
		);
	};

	// watch(
	// 	() => list.value,
	// 	() => {
	// 		window.localStorage.setItem(
	// 			LOCAL_STORAGE_NAME,
	// 			JSON.stringify({
	// 				countId: countId.value,
	// 				list: list.value,
	// 			})
	// 		);
	// 	}
	// );

	return { countId, list, addToLocalStorage };
});
