<script lang="ts">
    import dayjs from "dayjs";
    import isoWeek from "dayjs/plugin/isoWeek";
    import type { Event, Location } from "$lib/types/event";
    import { EventType } from "$lib/types/event";
	import type { Term } from "$lib/types/term";
    import { whichWeek } from "$lib/date_computations";

    export let event: Event;
    export let term: Term;
    export let firstInWeek: boolean = false;
    export let emptyWeek: boolean = false;
    export let phase: boolean = false;

    dayjs.extend(isoWeek);

    let date = dayjs(event.date).format("MMM DD");
    let week = whichWeek(term, event);
    let passed = dayjs().isAfter(dayjs(event.date));
</script>

<div class="flex flex-row max-w-60">
    {#if !phase}
        {#if firstInWeek}
            <div class="flex items-center justify-center border-solid border border-gray-200 rounded-lg text-gray-600 shadow-md min-w-11 max-w-11 min-h-11 max-h-11 text-center font-bold text-sm font-mono" class:bg-white={!passed} class:bg-gray-100={passed}>W{week}</div>
        {:else}
            <div class="lg:min-w-11 lg:max-w-11 lg:min-h-11 lg:max-h-11"></div>
        {/if}

        {#if !emptyWeek}
            {#if event.type == EventType.Event}
                <div class="pl-2"><i class="bi-calendar-event-fill text-sm text-gray-300" /></div>
            {:else if event.type == EventType.Checkpoint}
                <div class="pl-2"><i class="bi-check-circle-fill text-sm text-techlabspink" /></div>
            {:else if event.type == EventType.Cutoff}
                <div class="pl-2"><i class="bi-exclamation-circle-fill text-sm text-techlabspink" /></div>
            {/if}

            <div class="flex flex-col pl-2">
                <div class="font-bold text-sm" class:line-through={passed} class:text-gray-600={passed}><a class="hover:underline" href="/event/{event.id}">{event.title}</a></div>
                {#if event.type == EventType.Event}
                    <div class="text-sm" class:text-gray-600={passed}>{date}</div>
                {:else}
                    <div class="text-sm" class:text-gray-600={passed}>Due {date}</div>
                {/if}
            </div>
        {:else}
            <div class="pl-2"><i class="bi-dash-lg text-gray-300" /></div>
        {/if}
    {:else}
        <div class="max-lg:hidden text-sm font-bold">{event.title}</div>
        <div class="lg:hidden flex flex-col items-center">
            <i class="bi-flag-fill text-xl text-techlabspink" />
            <div class="text-sm font-bold">{event.title}</div>
        </div>
    {/if}
</div>
