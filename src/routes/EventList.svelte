<script lang="ts">
	import EventListItem from "./EventListItem.svelte";
    import type { Event, Location } from "$lib/types/event";

    export let events: Event[];
</script>

<div class="flex flex-row lg:flex-col gap-4 lg:gap-2 overflow-x-auto p-6 bg-white border-solid border rounded-xl border-gray-300 shadow-lg">
    {#each events as event}
        <EventListItem {event} />
    {/each}
</div>

