import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
	const count = ref(22);

	return { count };
});
