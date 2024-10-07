<script lang="ts">
    import dayjs from "dayjs";
	import EventView from "./EventView.svelte";
    import type { Event, Location } from "$lib/types/event";
    import { EventType } from "$lib/types/event";
    
    export let events: Event[];

    let nextMilestone = events.filter(event => (event.type == EventType.Checkpoint || event.type == EventType.Cutoff) && dayjs().isBefore(dayjs(event.date)))[0];
    let nextEvent = events.filter(event => event.type == EventType.Event && dayjs().isBefore(dayjs(event.date)))[0];
</script>

<div class="flex flex-col gap-8">
    <EventView event={nextMilestone} />
    <EventView event={nextEvent} />
</div>
