import { createApp } from "vue";
import "./main.css";

import App from "@/modules/app/App.vue";
import routerApp from "@/modules/app/routerApp";

const app = createApp(App);
app.use(routerApp);
app.mount("#app");
