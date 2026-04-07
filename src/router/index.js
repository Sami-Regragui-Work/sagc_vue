import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth";

const routes = [
    {
        path: "/",
        redirect: "login",
    },
    {
        path: "/login",
        name: "login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/auth/LoginView.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/auth/RegisterView.vue"),
    },
    {
        path: "/me",
        name: "Profile",
        component: () => import("@/views/ProfileView.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFoundView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const userStr = urlParams.get("user");
    const authStore = useAuthStore();

    if (token && userStr) {
        try {
            const user = JSON.parse(decodeURIComponent(userStr));
            authStore.setAuthData(token, user);

            window.history.replaceState({}, document.title, window.location.pathname);

            return next("/me");
        } catch (e) {
            console.error("OAuth callback failed:", e);
        }
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next("/login");
    }

    next();
});

export default router;
