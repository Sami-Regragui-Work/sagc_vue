import api from "./api.js";

export const authService = {
    async login(credentials) {
        const { data } = await api.post("/login", credentials);
        return data;
    },
    async register(userData) {
        const { data } = await api.post("/register", userData);
        return data;
    },
};
