import { defineStore } from "pinia"
import { createPinia } from "pinia"
export const pinia = createPinia()

export const useCompState = defineStore("compState", {
	state: () => {
		return {
			loading: true,
		}
	},
})

