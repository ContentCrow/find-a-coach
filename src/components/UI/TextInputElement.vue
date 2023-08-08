<template>
    <textarea v-if="this.type == 'textarea'" :id="this.inputField.id" :name="this.inputField.id" :required="this.required"
        :minlength="this.minlength" :maxlength="this.maxlength" :cols="this.cols" :rows="this.rows"
        @blur.once="onBlur()" ref="inputField" @change="onChange($event)" :value="this.inputField.value"
        class="peer order-2 px-2 py-1font-medium text-base text-black dark:text-slate-300 dark:bg-slate-500 outline-none rounded-md border border-gray-600 focus:ring-indigo-800 dark:focus:ring-slate-300 dark:focus:border-slate-300"></textarea> 
    <input v-else :type="this.type" :id="this.inputField.id" :name="this.inputField.id" :required="this.required" :minlength="this.minlength" :maxlength="this.maxlength" :value="this.inputField.value"
        :min="this.min" :max="this.max" @blur.once="onBlur()" @change="onChange($event)"
        class="peer order-2 px-2 py-1 font-medium text-base dark:bg-slate-500 text-black dark:text-slate-300 outline-none rounded-md border-2 border-gray-600 focus:ring-indigo-800 focus:border-indigo-800 dark:focus:ring-slate-300 dark:focus:border-slate-300" />
        <!-- autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(203,213,225)] -->
    <p v-if="!this.visited" class="order-3 text-sm italic invisible">x</p>
    <p v-else class=" order-3 invisible peer-invalid:visible text-inherit text-sm italic">
        <slot name="validation"></slot>
    </p>
    <div class="order-1 flex peer-invalid:[&>p]:text-red-400">
        <label :for="this.inputField.id">
            <slot name="label"></slot>
        </label>
        <p v-if="this.required" class="ml-1">*</p>
    </div>
</template>

<script>
export default {
    props: ['type', 'required', 'minlength', 'maxlength', 'min', 'max', 'cols', 'rows', 'inputField'],
    emits: ['update:inputField'],
    data() {
        return {
            visited: false,
        };
    },
    methods: {
        onBlur() {
            // console.log('blur', this.$refs.inputField.validity.valid);
            this.visited = true;
        },
        onChange(event) {
            // console.log(this.$refs.inputField.value, this.$refs.inputField.validity.valid);
            /*
            this.$emit('inputChange', {
                id: this.$refs.inputField.id,
                value: this.$refs.inputField.value,
                isValid: this.$refs.inputField.validity.valid
            });
            */
            let updatedInputField = { ...this.inputField };
            updatedInputField.value = event.target.value;
            updatedInputField.isValid = event.target.checkValidity();

            this.$emit('update:inputField', updatedInputField);
        }
    },
};
</script>

<style scoped>
input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 100px rgb(100 116 139 / var(--tw-bg-opacity)) inset;
    -moz-box-shadow: 0 0 0 100px rgb(100 116 139 / var(--tw-bg-opacity)) inset;
    box-shadow: 0 0 0 100px rgb(100 116 139 / var(--tw-bg-opacity)) inset;
    -webkit-text-fill-color: rgb(203 213 225 / var(--tw-bg-opacity));
}
</style>