<template>
  <the-header />
  <main class="max-w-4xl mx-auto p-4 mt-5 rounded-lg border-2 border-solid border-indigo-800 dark:border-slate-300">
    <router-view></router-view>
  </main>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
export default {
  components: {
    TheHeader,
  }
};
</script>

<style scoped></style>
