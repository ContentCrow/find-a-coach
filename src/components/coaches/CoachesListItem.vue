<template>
    <div class="flex justify-between">
        <div>
            <h3 class="font-bold">{{ this.coach.firstname }} {{ this.coach.lastname }}</h3>
            <span class="text-sm">{{ this.coach.rate }}$ / hour</span>
            <ul class="mt-4 list-none flex gap-4 select-none">
                <li v-for="interest in this.coach.interests" class="p-1 px-2 rounded-md text-base"
                    :class="getColorForInterest(interest)">
                    {{
                        interest.toUpperCase() }}</li>
            </ul>
            <span v-if="this.detailed" class="block mt-4 text-base truncate">{{ this.coach.description }}</span>
        </div>
        <router-link v-if="!this.detailed" :to="'/coaches/' + this.coach.id" class="self-end">
            <rounded-button class="p-2 px-4">Details</rounded-button>
        </router-link>
    </div>
</template>

<script>
import RoundedButton from '~/components/UI/RoundedButton.vue';
export default {
    components: {
        RoundedButton,
    },
    props: ['coach', 'detailed'],
    methods: {
        getColorForInterest(interestId) {
            switch (interestId) {
                case 'frontend':
                    return 'bg-green-500';
                case 'backend':
                    return 'bg-blue-500';
                case 'career':
                    return 'bg-orange-500';
                default:
                    return 'bg-gray-300';
            }
        }
    }
};
</script>