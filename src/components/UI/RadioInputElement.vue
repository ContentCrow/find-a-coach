<template>
    <div class="flex">
        <label :for="this.id">
            <slot name="label"></slot>
        </label>
        <p v-if="this.required" class="ml-1" :class="isValid ? 'text-inherit' : 'text-red-500'">*</p>
    </div>
    <div class="flex gap-6 w-fit px-3 py-1 rounded-md text-inherit" :class="isValid ? '' : 'bg-indigo-100 dark:bg-inherit'">
        <div v-for="item in possibleInterests" :key="item.id" class="flex items-center gap-2">
            <input type="checkbox" :id="item.id" :name="item.id" :checked="interests.value.includes(item.id)"
                ref="inputField" @change="onChange($event)" class=" text-inherit dark:text-indigo-800 focus:ring-gray-600" />
            <label :for="item.id">{{ item.title }}</label>
        </div>
    </div>
    <template v-if="slots.validation">
        <p v-if="!this.visited || (this.visited && isValid)" class="text-sm italic invisible">x</p>
        <p v-else class=" order-3 text-inherit text-sm italic">
            <slot name="validation"></slot>
        </p>
    </template>
</template>

<script>
import { useSlots } from 'vue';
export default {
    props: {
        id: {
            type: String,
            required: true,
        },
        required: {
            type: Boolean,
            required: false,
        },
        possibleInterests: {
            type: Array,
            required: true,
        },
        interests: {
            type: Object,
            required: true
        },
    },
    emits: ['update:interests'],
    data() {
        return {
            visited: false,
            slots: useSlots(),
        };
    },
    computed: {
        isValid() {
            return this.interests.value.length > 0;
        }
    },
    methods: {
        onChange(event) {
            this.visited = true;

            const checkboxId = event.target.id;
            const isChecked = event.target.checked;
            let updatedInterests = { ...this.interests };

            if (isChecked) {
                updatedInterests.value.push(checkboxId);
            } else {
                updatedInterests.value.splice(updatedInterests.value.indexOf(checkboxId), 1);
            }
            updatedInterests.isValid = this.isValid;
            this.$emit('update:interests', updatedInterests);
        }
    }
};
</script>