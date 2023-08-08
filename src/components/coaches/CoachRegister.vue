<template>
    <div class="flex flex-col items-center p-4">
        <h1 class="mb-10 self-start font-bold text-2xl text-indigo-800 dark:text-slate-300 select-none">Register as a coach!</h1>
        <form v-if="!submitted"
            class="list-none w-11/12 grid gap-x-10 gap-y-6 grid-cols-2 row-auto font-semibold text-lg text-indigo-800 dark:text-slate-300">
            <div class="flex flex-col gap-2">
                <text-input-element type="text" required="true" minlength="3" maxlength="16"
                    v-model:inputField="inputFields.firstname">
                    <template v-slot:label>Firstname</template>
                    <template v-slot:validation>Please provide a valid firstname.</template>
                </text-input-element>
            </div>
            <div class="flex flex-col gap-2">
                <text-input-element type="text" required="true" minlength="3" maxlength="16"
                    v-model:inputField="inputFields.lastname">
                    <template v-slot:label>Lastname</template>
                    <template v-slot:validation>Please provide a valid lastname.</template>
                </text-input-element>
            </div>
            <div class="flex flex-col gap-2">
                <text-input-element type="number" required="true" min="20" max="199" v-model:inputField="inputFields.rate">
                    <template v-slot:label>Hourly Rate</template>
                    <template v-slot:validation>Please provide a valid hourly rate.</template>
                </text-input-element>
            </div>
            <div class="flex flex-col gap-2">
                <text-input-element type="email" required="true" v-model:inputField="inputFields.email">
                    <template v-slot:label>Email</template>
                    <template v-slot:validation>Please provide a valid email address.</template>
                </text-input-element>
            </div>
            <div class="flex flex-col gap-2 col-span-2">
                <radio-input-element id="interests" :required="true"
                    :possibleInterests="this.coachesStore.getInterestsWCheck" v-model:interests="inputFields.interests">
                    <template v-slot:label>Interests</template>
                    <template v-slot:validation>Please provide at least one interest.</template>
                </radio-input-element>
            </div>
            <div class="flex flex-col gap-2 col-span-2 row-span-2">
                <text-input-element type="textarea" required="true" cols="20" rows="5" minlength="20" maxlength="200"
                    v-model:inputField="inputFields.description">
                    <template v-slot:label>Description</template>
                    <template v-slot:validation>Please provide at least a short description.</template>
                </text-input-element>
            </div>
            <rounded-button :disabled="!canSubmit" @click="onSubmit()" class="w-2/5 h-full">
                Register
            </rounded-button>
        </form>
        <div v-else>
            <p class="font-bold text-xl italic text-indigo-800">Thank you for registering {{
                this.inputFields.firstname.value.length > 0 ? this.inputFields.firstname.value : 'stranger' }}.</p>
        </div>
    </div>
</template>
<script>
import { mapStores } from 'pinia';
import { useCoachesStore } from '~/store';
import NavButton from '~/components/UI/NavButton.vue';
import TextInputElement from '~/components/UI/TextInputElement.vue';
import RadioInputElement from '~/components/UI/RadioInputElement.vue';
import RoundedButton from '~/components/UI/RoundedButton.vue';
const defaultInputFields = {
    firstname: {
        id: 'firstname',
        value: '',
        isValid: false,
    },
    lastname: {
        id: 'lastname',
        value: '',
        isValid: false,
    },
    rate: {
        id: 'rate',
        value: '',
        isValid: false,
    },
    email: {
        id: 'email',
        value: '',
        isValid: false,
    },
    description: {
        id: 'description',
        value: '',
        isValid: false,
    },
    interests: {
        id: 'interests',
        value: [],
        isValid: false,
    },
};

export default {
    components: {
        NavButton,
        TextInputElement,
        RadioInputElement,
        RoundedButton
    },
    data() {
        return {
            inputFields: { ...defaultInputFields },
            submitted: false,
        };
    },
    methods: {
        onSubmit() {
            if (!this.canSubmit)
                return;

            let coach = {};
            const inputFieldsArr = Object.values(this.inputFields);
            const possibleInterests = this.coachesStore.getInterestsWCheck;

            inputFieldsArr.forEach(({ id, value }) => {
                if (id == 'interests') {
                    let interests = [ ...value ];
                    coach = { ...coach, interests: interests };
                } else {
                    coach = { ...coach, [id]: value };
                }
            });
            this.coachesStore.registerCoach(coach);
            // this.inputFields = defaultInputFields;
            this.submitted = true;
        }
    },
    computed: {
        ...mapStores(useCoachesStore),
        canSubmit() {
            return Object.values(this.inputFields).every((item) => item.isValid);
        }
    }
};
</script>