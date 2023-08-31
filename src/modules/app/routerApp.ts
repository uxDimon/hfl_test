import { createRouter, createWebHistory } from "vue-router";
import AppTable from "@/modules/app/components/AppTable.vue";

const routerApp = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "table",
			component: AppTable,
		},
		{
			path: "/add",
			name: "add",
			props: {
				isAdd: true,
			},
			component: () => import("@/modules/app/components/AppEditAdd.vue"),
		},
		{
			path: "/edit/:id",
			name: "edit",
			component: () => import("@/modules/app/components/AppEditAdd.vue"),
		},
	],
});

export default routerApp;
