<template>
    <div class="flex flex-col gap-4">
        <coaches-list-item :coach="this.coach" :detailed="true"
            class="p-4 w-full rounded-lg border-2 border-solid border-indigo-800 dark:border-slate-300 font-semibold text-lg text-indigo-800 dark:text-slate-300"></coaches-list-item>
        <div class="p-4 w-full rounded-lg border-2 border-solid border-indigo-800 dark:border-slate-300">

            <h1 class="mb-6 font-bold text-lg text-indigo-800 dark:text-slate-300 select-none">Reach out now to <i>{{ this.coach.firstname }} {{ this.coach.lastname }}</i></h1>
            <form v-if="!submitted"
                class="list-none w-11/12 grid gap-x-10 gap-y-4 grid-cols-2 row-auto font-semibold text-lg text-indigo-800 dark:text-slate-300">
                <div class="flex flex-col gap-2">
                    <text-input-element type="email" required="true" v-model:inputField="inputFields.email">
                        <template v-slot:label>Email</template>
                        <template v-slot:validation>Please provide a valid email address.</template>
                    </text-input-element>
                </div>
                <div class="flex flex-col gap-2 col-span-2">
                    <text-input-element type="textarea" required="true" cols="20" rows="5" minlength="20" maxlength="200"
                        v-model:inputField="inputFields.message">
                        <template v-slot:label>Message</template>
                        <template v-slot:validation>Please provide at least a short message.</template>
                    </text-input-element>
                </div>
                <rounded-button :disabled="!canSubmit" @click="onSubmit()" class="w-2/5 h-full">
                    Send
                </rounded-button>
            </form>
            <div v-else>
                <p class="font-bold text-base italic text-indigo-800 dark:text-slate-300">Your request for {{ this.coach.firstname }} {{ this.coach.lastname }} has been sent.</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapStores } from 'pinia';
import { useCoachesStore, useRequestsStore } from '~/store.js';
import CoachesListItem from '~/components/coaches/CoachesListItem.vue';
import TextInputElement from '~/components/UI/TextInputElement.vue';
import RoundedButton from '~/components/UI/RoundedButton.vue';
const defaultInputFields = {
    email: {
        id: 'email',
        value: '',
        isValid: false,
    },
    message: {
        id: 'message',
        value: '',
        isValid: false,
    },
};

export default {
    components: {
        CoachesListItem,
        TextInputElement,
        RoundedButton
    },
    data() {
        return {
            coach: {},
            inputFields: { ...defaultInputFields },
            submitted: false
        };
    },
    methods: {
        onSubmit() {
            if (!this.canSubmit)
                return;

            const request = {
                email: this.inputFields.email.value,
                message: this.inputFields.message.value,
                coachId: this.$route.params.coachId
            };
            this.requestsStore.addRequest(request);
            this.submitted = true;
        }
    },
    computed: {
        ...mapStores(useCoachesStore, useRequestsStore),
        canSubmit() {
            return Object.values(this.inputFields).every((item) => item.isValid);
        }
    },
    created() {
        const coachId = this.$route.params.coachId;
        this.coach = this.coachesStore.coaches.find((c) => c.id === coachId);
    }
};
</script>