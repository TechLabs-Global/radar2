<script lang="ts">
    import EventList from './EventList.svelte';
	import CurrentEvents from './CurrentEvents.svelte';
    import type { Event, Location } from "$lib/types/event";

    async function fetchEvents() {
        const res = await fetch("/api/events");
        const events: Event[] = await res.json();

        return events;
    }
</script>

<div class="flex flex-row flex-wrap lg:flex-nowrap max-w-5xl mt-6 mb-4 mx-2 lg:mx-auto">
    {#await fetchEvents()}
        <div>Loading...</div>
    {:then events}
        <div class="shrink-0 w-full lg:w-1/3 pb-8 lg:pr-8"><EventList {events} /></div>
        <div class="shrink-0 w-full lg:w-2/3"><CurrentEvents {events} /></div>
    {:catch error}
        <div>Error: {error.message}</div>
    {/await}
</div>
