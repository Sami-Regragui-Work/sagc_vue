<template>
    <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4">
        <div class="max-w-2xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-12">
                <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar"
                    class="w-32 h-32 rounded-full mx-auto mb-6 object-cover" :class="{ 'animate-pulse': loading }" />
                <div v-else
                    class="w-32 h-32 bg-emerald-200 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-emerald-700"
                    :class="{ 'animate-pulse': loading }">
                    {{ getInitials() }}
                </div>
                <h1 class="text-4xl font-bold text-gray-900 mb-2">
                    {{ getDisplayName() }}
                </h1>
                <p class="text-gray-600">{{ authStore.user?.email || 'No email set' }}</p>
            </div>

            <!-- Edit Form -->
            <div class="bg-white/80 backdrop-blur p-8 rounded-3xl shadow-2xl">
                <div v-if="loading" class="text-center py-12">
                    <div
                        class="animate-spin w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full mx-auto">
                    </div>
                    <p class="mt-4 text-gray-600">Loading profile...</p>
                </div>

                <div v-else>
                    <!-- Profile Tab -->
                    <form @submit.prevent="updateProfile" class="space-y-6 mb-8">
                        <!-- Username -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                            <input v-model="form.username" type="text"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                :disabled="updating" required />
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                            <input v-model="form.email" type="email"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                :disabled="updating" required />
                        </div>

                        <!-- First Name -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                            <input v-model="form.first_name" type="text"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                :disabled="updating" />
                        </div>

                        <!-- Last Name -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                            <input v-model="form.last_name" type="text"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                :disabled="updating" />
                        </div>

                        <!-- Phone -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                            <input v-model="form.phone" type="tel"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                :disabled="updating" />
                        </div>

                        <!-- Address Details (2-column layout) -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                                <input v-model="form.country" type="text"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    :disabled="updating" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">City</label>
                                <input v-model="form.city" type="text"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    :disabled="updating" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Postal Code</label>
                                <input v-model="form.postal_code" type="text"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    :disabled="updating" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                                <input v-model="form.address" type="text"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    :disabled="updating" />
                            </div>
                        </div>

                        <!-- Birthdate & Bio -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Birthdate</label>
                                <input v-model="form.birthdate" type="date"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    :disabled="updating" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Bio</label>
                                <textarea v-model="form.bio" rows="3"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-vertical"
                                    :disabled="updating"></textarea>
                            </div>
                        </div>

                        <!-- Avatar URL -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-2">Avatar URL (optional)</label>
                            <input v-model="form.avatar_url" type="url"
                                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                :disabled="updating" placeholder="https://example.com/avatar.png" />
                        </div>

                        <!-- Actions -->
                        <div class="flex gap-4 pt-4">
                            <button type="submit" :disabled="updating || !isDirty"
                                class="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 transition-all shadow-lg">
                                {{ updating ? 'Updating...' : 'Update Profile' }}
                            </button>
                            <button type="button" @click="logout"
                                class="flex-1 bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg">
                                Logout
                            </button>
                        </div>
                    </form>

                    <!-- Password Section -->
                    <div class="border-t pt-8">
                        <h3 class="text-xl font-bold text-gray-900 mb-6">Change Password</h3>

                        <!-- Disable for OAuth users -->
                        <div v-if="authStore.user?.oauth_provider"
                            class="p-6 bg-amber-50 border-2 border-amber-200 rounded-xl text-center">
                            <p class="text-amber-800 font-medium mb-2">
                                🔒 Password change disabled
                            </p>
                            <p class="text-sm text-amber-700">
                                This account uses {{ authStore.user.oauth_provider }} login.
                                Update profile details above.
                            </p>
                        </div>

                        <!-- Local password form -->
                        <form v-else @submit.prevent="updatePassword" class="space-y-4">
                            <!-- Your existing 3 inputs + button -->
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                                <input v-model="passwordForm.current_password" type="password" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    :disabled="updatingPassword" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                <input v-model="passwordForm.new_password" type="password" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    :disabled="updatingPassword" />
                            </div>
                            <div>
                                <label class="block text-sm font-semibold text-gray-700 mb-2">Confirm New
                                    Password</label>
                                <input v-model="passwordForm.new_password_confirmation" type="password" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                    :disabled="updatingPassword" />
                            </div>
                            <button type="submit" :disabled="updatingPassword || !isPasswordValid"
                                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all shadow-lg">
                                {{ updatingPassword ? 'Updating...' : 'Update Password' }}
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Messages -->
                <div v-if="error"
                    class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
                    {{ error }}
                </div>
                <div v-if="success"
                    class="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm text-center">
                    {{ success }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import api from '@/services/api'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({})
const passwordForm = ref({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
})
const loading = ref(true)
const updating = ref(false)
const updatingPassword = ref(false)
const error = ref('')
const success = ref('')

const isDirty = computed(() => {
    const user = authStore.user
    return Object.keys(form.value).some(key =>
        form.value[key] !== (user?.[key] ?? '')
    )
})

const isPasswordValid = computed(() => {
    return passwordForm.value.new_password === passwordForm.value.new_password_confirmation &&
        passwordForm.value.new_password.length >= 8
})

const getInitials = () => {
    const user = authStore.user
    if (user?.first_name || user?.last_name) {
        return (user.first_name?.[0] || '') + (user.last_name?.[0] || '')
    }
    return user?.username?.[0]?.toUpperCase() || 'U'
}

const getDisplayName = () => {
    const user = authStore.user
    if (user?.first_name || user?.last_name) {
        return `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username
    }
    return user?.username || 'User'
}

onMounted(async () => {
    if (!authStore.isAuthenticated) {
        router.push('/login')
        return
    }

    try {
        const response = await api.get('/me')
        const userData = response.data.user
        authStore.setAuthData(authStore.token, userData)

        form.value = {
            username: userData.username || '',
            email: userData.email || '',
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            phone: userData.phone || '',
            country: userData.country || '',
            address: userData.address || '',
            city: userData.city || '',
            postal_code: userData.postal_code || '',
            birthdate: userData.birthdate || '',
            bio: userData.bio || '',
            avatar_url: userData.avatar_url || ''
        }
    } catch (err) {
        console.error('Profile load failed:', err)
        authStore.clearAuth()
        router.push('/login')
    } finally {
        loading.value = false
    }
})

const updateProfile = async () => {
    updating.value = true
    error.value = success.value = ''

    try {
        const cleanForm = Object.fromEntries(
            Object.entries(form.value).filter(([key, value]) => {
                const original = authStore.user?.[key] ?? ''
                return value !== original
            })
        )

        if (Object.keys(cleanForm).length === 0) {
            success.value = 'No changes to save'
            updating.value = false
            return
        }

        const response = await api.patch('/me', cleanForm)

        const updatedUser = response.data.user || response.data
        authStore.setAuthData(authStore.token, updatedUser)

        Object.entries(updatedUser).forEach(([key, value]) => {
            form.value[key] = value ?? ''
        })

        success.value = response.data.message || 'Profile updated successfully!'

    } catch (err) {
        console.error('Update failed:', err.response?.data)
        if (err.response?.data?.errors) {
            error.value = Object.values(err.response.data.errors)
                .flat()
                .join(', ')
        } else {
            error.value = err.response?.data?.message || 'Update failed'
        }
    } finally {
        updating.value = false
    }
}

const updatePassword = async () => {
    updatingPassword.value = true
    error.value = success.value = ''

    try {
        await api.patch('/me/password', passwordForm.value)
        success.value = 'Password updated successfully!'
        passwordForm.value = { current_password: '', new_password: '', new_password_confirmation: '' }
    } catch (err) {
        error.value = err.response?.data?.message || 'Password update failed'
    } finally {
        updatingPassword.value = false
    }
}

const logout = async () => {
    try {
        await api.post('/logout')
    } catch {
        //
    }
    authStore.clearAuth()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    router.push('/login')


}

const avatarUrl = computed(() => {
    const url = authStore.user?.avatar_url
    if (!url) return null
    if (url.startsWith('http://localhost:8000')) return url
    return `${process.env.VUE_APP_API_URL}/avatar-proxy?url=${encodeURIComponent(url)}`
})
</script>