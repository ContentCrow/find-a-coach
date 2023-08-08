<template>
    <div class="flex items-center flex-col">
        <h1 class="mb-5 font-bold text-2xl text-indigo-800 dark:text-slate-300 select-none">Requests Received</h1>
        <ul class="list-none w-11/12 flex flex-col gap-4">
            <li class="p-4 rounded-lg border-2 border-solid border-indigo-800 dark:border-slate-300">
                <request-list-item :coach="null" email="test@test.de" message="This is my message to the world! The contact information provided by an <address> element's contents can take whatever form is appropriate for the context, and may include any type of contact information that is needed, such as a physical address, URL, email address, phone number, social media handle, geographic coordinates, and so forth. The <address> element should include the name of the person, people, or organization to which the contact information refers." class="dark:text-slate-300" />
            </li>
            <li v-for="request in this.requestsStore.requests" :key="request.id" class="p-4 rounded-lg border-2 border-solid border-indigo-800 dark:border-slate-300">
                <request-list-item :coach="this.coachesStore.getCoachById(request.coachId)" :email="request.email" :message="request.message" class="dark:text-slate-300"/>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapStores } from 'pinia';
import { useRequestsStore, useCoachesStore } from '~/store';
import RequestListItem from '~/components/requests/RequestListItem.vue';
export default {
    components: {
        RequestListItem
    },
    computed: {
        ...mapStores(useRequestsStore, useCoachesStore)
    }
};
</script>