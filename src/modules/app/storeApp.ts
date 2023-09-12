import { watch, reactive } from "vue";
import { defineStore } from "pinia";
import type { ListItem } from "@/modules/app/interfaceApp";

const LOCAL_STORAGE_NAME = "appData";

const useAppStore = defineStore("app", () => {
	const appData = reactive<{
		countId: number;
		list: ListItem[];
	}>({
		countId: 3,
		list: [
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
		],
	});

	// localStorage
	type LocalApp = { countId: number; list: ListItem[] };
	let localApp: string | null | LocalApp = window.localStorage.getItem(LOCAL_STORAGE_NAME);

	if (localApp) {
		localApp = <LocalApp>JSON.parse(localApp);

		appData.countId = localApp.countId;
		appData.list = localApp.list;
	}

	// Придётся вызывать при каждом изменении эту функцию, зато больше контроля)

	watch(appData, () => {
		window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(appData));
	});

	return { appData };
});

export default useAppStore;
