<script lang="ts">
    import dayjs from "dayjs";
    import weekOfYear from "dayjs/plugin/weekOfYear";
	import EventListItem from "./EventListItem.svelte";
    import type { Event, Location } from "$lib/types/event";
	import type { Term } from "$lib/types/term";

    export let events: Event[];

    dayjs.extend(weekOfYear);

    async function fetchTerm() {
        const res = await fetch("/api/term");
        const term: Term = await res.json();

        return term;
    }

    function firstEventInWeek(events: Event[], event: Event): boolean {
        if (events.length == 0) {
            return true;
        }

        let week = dayjs(event.date).week();
        let weekEvents = events.filter(e => dayjs(e.date).week() == week);

        return weekEvents.indexOf(event) == 0;
    }
</script>

<div class="flex flex-row lg:flex-col gap-4 lg:gap-4 overflow-x-auto p-6 bg-white border-solid border rounded-xl border-gray-300 shadow-lg">
    {#await fetchTerm()}
        <div>Loading...</div>
    {:then term}
        {#each events as event}
            <EventListItem {event} {term} firstInWeek={firstEventInWeek(events, event)} />
        {/each}
    {:catch error}
        <div>Error: {error.message}</div>
    {/await}
</div>

