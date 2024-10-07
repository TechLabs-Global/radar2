<script lang="ts">
    import dayjs from "dayjs";
    import type { Event, Location } from "$lib/types/event";
    import { EventType } from "$lib/types/event";

    export let event: Event;
    let date = dayjs(event.date).format("MMM DD");
</script>

<div class="flex flex-row max-w-60">
    <div class="flex items-center justify-center border-solid border border-gray-200 rounded-md bg-gray-100 shadow-md min-w-11 max-w-11 min-h-11 max-h-11 text-center font-bold">W0</div>
    {#if event.type == EventType.Event}
        <div class="pl-2"><i class="bi-calendar-event-fill text-gray-300" /></div>
    {:else if event.type == EventType.Checkpoint}
        <div class="pl-2"><i class="bi-check-square-fill text-gray-300" /></div>
    {:else if event.type == EventType.Cutoff}
        <div class="pl-2"><i class="bi-exclamation-square-fill text-gray-300" /></div>
    {/if}
    <div class="flex flex-col pl-2">
        <div class="font-bold text-sm"><a class="hover:underline" href="/event/{event.id}">{event.title}</a></div>
        {#if event.type == EventType.Event}
            <div class="text-sm">{date}</div>
        {:else}
            <div class="text-sm">Due {date}</div>
        {/if}
    </div>
</div>
