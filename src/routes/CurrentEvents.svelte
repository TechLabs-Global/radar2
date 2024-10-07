<script lang="ts">
	import EventView from "./EventView.svelte";
    import type { Event, Location } from "$lib/types/event";
    
    export let events: Event[];
    let nextEvent = events[0];
</script>

<div class="flex flex-col gap-8">
    <div class="bg-pink-200 border-solid border rounded-xl border-gray-300 shadow-lg p-6">
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
        eventlist eventlist eventlist<br>
    </div>
    <div class="bg-white border-solid border rounded-xl border-gray-300 shadow-lg p-6"><EventView event={nextEvent} /></div>
</div>
