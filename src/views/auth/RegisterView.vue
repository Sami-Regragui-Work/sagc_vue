<template>
    <div
        class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4 py-12">
        <AuthForm title="Sign Up" submit-text="Create Account" :form="form" :loading="loading" :error="error"
            :handle-submit="register">
            <template #fields="{ form }">
                <div>
                    <input v-model="form.username" type="text" placeholder="Username"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        required />
                </div>
                <div>
                    <input v-model="form.email" type="email" placeholder="Email"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        required />
                </div>
                <div>
                    <input v-model="form.password" type="password" placeholder="Password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        required minlength="8" />
                </div>
                <div>
                    <input v-model="form.password_confirmation" type="password" placeholder="Confirm Password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        required />
                </div>
            </template>
            <template #footer>
                Already have account? <router-link to="/login" class="text-emerald-600 hover:underline font-medium">Sign
                    In</router-link>
            </template>
        </AuthForm>

        <!-- Shared Social Login -->
        <SocialAuth />
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth'
import AuthForm from '@/components/AuthForm.vue'
import SocialAuth from '@/components/SocialAuth.vue'

const router = useRouter()

const form = ref({
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
})
const loading = ref(false)
const error = ref('')

const validateForm = () => {
    if (form.value.username.length < 3) {
        error.value = 'Username must be at least 3 characters'
        return false
    }
    if (form.value.password.length < 8) {
        error.value = 'Password must be at least 8 characters'
        return false
    }
    if (form.value.password !== form.value.password_confirmation) {
        error.value = 'Passwords do not match'
        return false
    }
    return true
}

watchEffect(() => {
    if (loading.value) return
    error.value = ''
})

const register = async () => {
    if (!validateForm()) return

    loading.value = true
    error.value = ''

    try {
        await authService.register(form.value)
        form.value = { username: '', email: '', password: '', password_confirmation: '' }
        router.push('/login')
    } catch (err) {
        if (err.response?.status === 422) {
            const errors = Object.values(err.response.data.errors).flat()
            error.value = errors.join(', ')
        } else {
            error.value = err.response?.data?.message || 'Registration failed'
        }
    } finally {
        loading.value = false
    }
}
</script>