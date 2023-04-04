import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		//使用IP能访问
		host: "0.0.0.0",
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/assets/base.scss";`,
			},
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@api": resolve(__dirname, "./src/api"),
			"@router": resolve(__dirname, "./src/router"),
			"@utils": resolve(__dirname, "./src/utils"),
			"@comp": resolve(__dirname, "./src/components"),
			"@view": resolve(__dirname, "./src/views"),
			"@assets": resolve(__dirname, "./src/assets"),
			"@store": resolve(__dirname, "./src/store"),
			"@icon": resolve(__dirname, "./src/assets/icon"),
		},
	},
})
