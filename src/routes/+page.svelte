<script lang="ts">
    import EventList from './EventList.svelte';
	import CurrentEvents from './CurrentEvents.svelte';
    import type { Event, Location } from "$lib/types/event";
	import type { Term } from '$lib/types/term';

    async function fetchEventsAndTerm(): Promise<[Event[], Term]> {
        const resEvents = await fetch("/api/events");
        const events: Event[] = await resEvents.json();

        const resTerm = await fetch("/api/term");
        const term: Term = await resTerm.json();

        return [events, term];
    }
</script>

<div class="flex flex-row flex-wrap lg:flex-nowrap max-w-5xl mt-6 mb-4 mx-2 lg:mx-auto">
    {#await fetchEventsAndTerm()}
        <div>Loading...</div>
    {:then [events, term]}
        <div class="shrink-0 w-full lg:w-1/3 pb-8 lg:pr-8"><EventList {events} {term} /></div>
        <div class="shrink-0 w-full lg:w-2/3"><CurrentEvents {events} /></div>
    {:catch error}
        <div>Error: {error.message}</div>
    {/await}
</div>
