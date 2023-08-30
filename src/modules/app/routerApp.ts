import { createRouter, createWebHistory } from "vue-router";
import AppTable from "./components/AppTable.vue";

const routerApp = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "table",
			component: AppTable,
		},
		{
			path: "/edit",
			name: "edit",
			component: () => import("./components/AppChangesAdd.vue"),
		},
	],
});

export default routerApp;
