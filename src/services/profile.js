import api from "./api.js";

export const profileService = {
    async getProfile() {
        const { data } = await api.get("/me");
        return data;
    },
    async updateProfile(profileData) {
        const { data } = await api.patch("/me", profileData);
        return data;
    },
    async updatePassword(passwordData) {
        const { data } = await api.patch("/me/password", passwordData);
        return data;
    },
    async deleteAccount() {
        const { data } = await api.delete("/me");
        return data;
    },
};
