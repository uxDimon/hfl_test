import "./main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import routerApp from "@/modules/app/routerApp";
import App from "@/modules/app/App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(routerApp);
app.mount("#app");
