<template>
    <button :disabled="this.disabled" type="button" class="my-1 rounded-lg border border-solid border-indigo-800 dark:border-slate-300 
            disabled:pointer-events-none focus:bg-indigo-800 focus:bg-opacity-80 focus:text-slate-100
            hover:bg-indigo-800 hover:bg-opacity-80 hover:text-slate-100 transition-colors duration-300
            disabled:opacity-50">
        <slot></slot>
    </button>
</template>
<script>
export default {
    props: ['disabled'],
};
</script>