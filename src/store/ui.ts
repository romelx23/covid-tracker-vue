import { defineStore } from "pinia";

export const useUiStore = defineStore("ui",{
    state: () => ({
        isDark: false,
        isDrawerOpen: true,
    }),
    getters: {
        getIsDark(state) {
            return state.isDark;
        },
        getIsDrawerOpen(state): boolean {
            return state.isDrawerOpen;
        },
    },
    actions: {
        setIsDark(isDark: boolean) {
            this.isDark = isDark;
        },
        setIsDrawerOpen(isDrawerOpen: boolean) {
            this.isDrawerOpen = !isDrawerOpen;
        },
    },
});
