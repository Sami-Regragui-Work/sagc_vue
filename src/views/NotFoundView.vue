<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 px-4">
        <div class="text-center">
            <h1 class="text-9xl font-bold text-emerald-600 mb-4">404</h1>
            <p class="text-2xl font-semibold text-gray-800 mb-2">Page not found</p>
            <p class="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
            <router-link to="/"
                class="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg">
                Go Home
            </router-link>
        </div>
    </div>
</template>