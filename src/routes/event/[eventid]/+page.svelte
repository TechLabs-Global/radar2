<script lang="ts">
    import { page } from "$app/stores";
    import type { Event, Location } from "$lib/types/event";
	import EventView from "../../EventView.svelte";

    async function fetchEvent(eventId: string): Promise<Event> {
        const res = await fetch(`/api/event/${eventId}`);

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return await res.json();
    }

    const eventId = $page.params.eventid;
</script>

<div class="max-w-3xl mt-6 mb-4 mx-2 md:mx-auto">
    {#await fetchEvent(eventId)}
        <div>Loading...</div>
    {:then event}
        <a class="flex flex-row gap-1 text-gray-600 pb-4 hover:text-gray-800" href="/">
            <i class="bi-chevron-left" />
            <p>Back to the timeline</p>
        </a>
        <EventView {event} />
    {:catch error}
        <div>Error: {error.message}</div>
    {/await}
</div>
