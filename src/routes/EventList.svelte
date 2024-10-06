<script lang="ts">
	import EventListItem from "./EventListItem.svelte";
    import type { Event, Location } from "$lib/types/event";

    async function fetchEvents() {
        const res = await fetch("/api/events");
        const events: Event[] = await res.json();

        return events;
    }
</script>

<div class="flex flex-row lg:flex-col gap-1 overflow-x-auto p-6 bg-white border-solid border rounded-xl border-gray-300 shadow-lg">
    {#await fetchEvents()}
        <div>Loading...</div>
    {:then events}
        {#each events as event}
            <EventListItem />
        {/each}
    {:catch error}
        <div>Error: {error.message}</div>
    {/await}
</div>

