import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import postcss from "@vituum/vite-plugin-postcss";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.join(__dirname, "src"),
		},
	},
	plugins: [vue(), postcss()],
});
