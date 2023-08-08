<template>
    <div class="flex flex-col gap-2 font-semibold text-lg selection:bg-indigo-800 selection:text-slate-100">
        <div class="flex justify-between">
            <div class="gap-2">
                <p class="font-bold inline">From: </p>
                <address class="inline">
                    <a :href="'mailto:' + this.email" class="hover:text-indigo-800 transition-colors duration-200">{{
                        this.email
                    }}</a>
                </address>
            </div>
            <div v-if="coach" class="gap-2">
                <p class="font-bold inline">To: </p>
                <router-link :to="'/coaches/' + this.coach.id" class="hover:text-indigo-800 transition-colors duration-200">
                    {{ this.coach.firstname }} {{ this.coach.lastname }}
                </router-link>
            </div>
        </div>
        <div class="gap-2">
            <p class="font-bold inline">Message: </p>
            <p class="inline">{{ this.message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['email', 'message', 'coach']
};
</script>
