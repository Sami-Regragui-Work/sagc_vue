<template>
    <form @submit.prevent="handleSubmit"
        class="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">{{ title }}</h1>

        <div
            class="space-y-4 [&_input]:w-full [&_input]:px-4 [&_input]:py-3 [&_input]:border [&_input]:border-gray-300 [&_input]:rounded-xl [&_input]:focus:ring-2 [&_input]:focus:ring-emerald-500 [&_input]:focus:border-transparent [&_input]:transition-all [&_textarea]:w-full [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:border [&_textarea]:border-gray-300 [&_textarea]:rounded-xl [&_textarea]:focus:ring-2 [&_textarea]:focus:ring-emerald-500 [&_textarea]:focus:border-transparent [&_textarea]:transition-all">
            <slot name="fields" :form="form" />
        </div>

        <p v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center">
            {{ formatError }}
        </p>

        <button type="submit" :disabled="loading"
            class="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 transition-all shadow-lg">
            <span v-if="loading"
                class="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
            {{ loading ? `${submitText}ing...` : submitText }}
        </button>

        <p class="mt-6 text-center text-gray-600 text-sm">
            <slot name="footer" />
        </p>
    </form>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    submitText: {
        type: String,
        required: true
    },
    form: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    error: {
        type: [String, Object],
        default: ''
    },
    handleSubmit: {
        type: Function,
        required: true
    }
})

const formatError = computed(() => {
    if (typeof props.error === 'string') return props.error
    if (props.error?.message) return props.error.message
    return 'Something went wrong'
})
</script>