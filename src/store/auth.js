import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") ?? null,
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        username: (state) => state.user?.username || null,
    },
    actions: {
        setAuthData(token, user = null) {
            this.token = token;
            this.user = user;
            localStorage.setItem("token", token);
            if (user) localStorage.setItem("user", JSON.stringify(user));
        },
        clearAuth() {
            this.token = null;
            this.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});
