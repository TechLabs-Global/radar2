<script lang="ts">
    import dayjs from "dayjs";
    import isoWeek from "dayjs/plugin/isoWeek";
	import EventListItem from "./EventListItem.svelte";
    import { Event, Location } from "$lib/types/event";
	import type { Term } from "$lib/types/term";
	import type { Phase } from "$lib/types/phase";
    import { whichWeek, termWeekFirstDay } from "$lib/date_computations";

    export let events: Event[];
    export let term: Term;
    export let phases: Phase[];

    dayjs.extend(isoWeek);

    // Clone events
    events = events.map(e => Object.assign({}, e));

    function firstEventInWeek(events: Event[], event: Event): boolean {
        if (events.length == 0) {
            return true;
        }

        let week = whichWeek(term, event);
        let weekEvents = events.filter(e => whichWeek(term, e) == week && e.id != "PHASE");

        return weekEvents.indexOf(event) == 0;
    }

    // Add placeholder events to weeks without event at the right position in the events array

    const weeks = whichWeek(term, events[events.length - 1]);
    let lastIndex = 0;

    for (let week = 0; week < weeks; week++) {
        let weekEvents = events.filter(e => whichWeek(term, e) == week);

        if (weekEvents.length == 0) {
            let emptyEvent = new Event();
            emptyEvent.id = "";
            emptyEvent.date = termWeekFirstDay(term, week).toDate();

            events.splice(lastIndex, 0, emptyEvent);
            lastIndex++;
        } else {
            lastIndex += weekEvents.length;
        }
    }

    // Add placeholder events for phases at the right position in the events array

    lastIndex = 0;

    for (let week = 0; week < weeks; week++) {
        let weekEvents = events.filter(e => whichWeek(term, e) == week);
        let phase = phases.filter(p => whichWeek(term, undefined, p) == week);

        if (phase && phase.length > 0) {
            let phaseEvent = new Event();
            phaseEvent.title = phase[0].title;
            phaseEvent.id = "PHASE";
            phaseEvent.date = termWeekFirstDay(term, week).toDate();

            events.splice(lastIndex, 0, phaseEvent);
            lastIndex += weekEvents.length + 1;
        } else {
            lastIndex += weekEvents.length;
        }
    }
</script>

<div class="flex flex-row lg:flex-col gap-4 lg:gap-4 overflow-x-auto p-6 bg-white border-solid border rounded-xl border-gray-300 shadow-lg">
    {#each events as event}
        <EventListItem {event} {term} firstInWeek={event.id == "" || firstEventInWeek(events, event)} emptyWeek={event.id == ""} phase={event.id == "PHASE"} />
    {/each}
</div>

