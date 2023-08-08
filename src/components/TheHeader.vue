<template>
    <header class="sticky top-0 bg-indigo-800 text-slate-100 dark:text-slate-300">
        <div class="max-w-4xl mx-auto p-4 flex items-center justify-between">
            <h1 class="font-bold text-3xl select-none underline underline-offset-8 hover:scale-110 hover:-translate-y-2 transition-all duration-300">Find a coach</h1>
            <nav class="flex gap-5 font-semibold">
                <router-link to="/coaches" class="group">
                    <nav-button>All Coaches</nav-button>
                </router-link>
                <router-link to="/requests" class="group">
                    <nav-button>Requests</nav-button>
                </router-link>
                <router-link to="/register" class="group">
                    <nav-button>Register</nav-button>
                </router-link>
            </nav>
        </div>
    </header>
</template>
<script>
import NavButton from '~/components/UI/NavButton.vue';
export default {
    components: {
        NavButton
    }
};
</script>