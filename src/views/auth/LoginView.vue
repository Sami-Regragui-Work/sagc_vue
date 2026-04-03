<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4 py-12">
        <AuthForm title="Welcome Back" submit-text="Sign In" :form="form" :loading="loading" :error="error"
            :handle-submit="login">
            <template #fields="{ form }">
                <input v-model="form.email" type="email" placeholder="Email" required autocomplete="email" />
                <input v-model="form.password" type="password" placeholder="Password" required
                    autocomplete="current-password" />
            </template>
            <template #footer>
                Don't have an account?
                <router-link to="/register" class="text-emerald-600 hover:underline font-medium">
                    Sign Up
                </router-link>
            </template>
        </AuthForm>
        <SocialAuth />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { authService } from '@/services/auth'
import AuthForm from '@/components/AuthForm.vue'
import SocialAuth from '@/components/SocialAuth.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

const login = async () => {
    loading.value = true
    error.value = ''
    try {
        const authData = await authService.login(form.value)
        authStore.setAuthData(authData.token, authData.user)
        router.push('/me')
    } catch (err) {
        error.value = err.response?.data?.message || 'Login failed'
    } finally {
        loading.value = false
    }
}
</script>