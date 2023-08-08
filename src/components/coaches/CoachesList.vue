<template>
    <h1 class="mb-6 font-bold text-2xl text-indigo-800 dark:text-slate-300 select-none">All Coaches</h1>
    <div class="flex flex-col gap-4">
        <div class="p-4 rounded-lg border-2 border-solid border-indigo-800 dark:border-slate-300 text-indigo-800 dark:text-slate-300 font-semibold text-lg">
            <radio-input-element id="interestsfilter" :possibleInterests="possibleInterests" v-model:interests="interests">
                <template v-slot:label>Filter by Interests</template>
            </radio-input-element>
        </div>
        <div class="p-4 rounded-lg border-2 border-solid border-indigo-800 dark:border-slate-300">
            <ul class="px-2 list-none w-full m-auto flex flex-col items-center gap-4">
                <li v-for="coach in filteredCoaches" :key="coach.id"
                    class="p-4 w-full rounded-lg border-2 border-solid border-indigo-800 dark:border-slate-300 font-semibold text-lg text-indigo-800 dark:text-slate-300">
                    <coaches-list-item :coach="coach" :detailed="false"></coaches-list-item>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapStores } from 'pinia';
import { useCoachesStore } from '~/store.js';
import RadioInputElement from '~/components/UI/RadioInputElement.vue';
import CoachesListItem from '~/components/coaches/CoachesListItem.vue';
export default {
    components: {
        RadioInputElement,
        CoachesListItem
    },
    data() {
        return {
            possibleInterests: [],
            interests: {
                id: 'interests',
                value: [],
                isValid: true,
            },
        };
    },
    methods: {
        hasMatchingInterest(coachInterests) {
            let hasMatch = false;
            this.interests.value.forEach((interest) => {
                if(coachInterests.includes(interest))
                    hasMatch = true;
                    return;
            });
            return hasMatch;
        },
    },
    computed: {
        ...mapStores(useCoachesStore),
        filteredCoaches() {
            return [...this.coachesStore.coaches].filter((coach) => this.hasMatchingInterest(coach.interests));
        }
    },
    created() {
        this.possibleInterests = [...this.coachesStore.getInterestsWCheck];
        this.possibleInterests.forEach((interest) => {
            this.interests.value.push(interest.id);
        });
    }
};
</script>