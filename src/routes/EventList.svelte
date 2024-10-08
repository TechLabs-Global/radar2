<script lang="ts">
    import dayjs from "dayjs";
    import isoWeek from "dayjs/plugin/isoWeek";
	import EventListItem from "./EventListItem.svelte";
    import { Event, Location } from "$lib/types/event";
	import type { Term } from "$lib/types/term";
	import type { Phase } from "$lib/types/phase";

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

        let week = dayjs(event.date).isoWeek();
        let weekEvents = events.filter(e => dayjs(e.date).isoWeek() == week && e.id != "PHASE");

        return weekEvents.indexOf(event) == 0;
    }

    // Add placeholder events to weeks without event at the right position in the events array

    const weekOffset = dayjs(term.startDate).isoWeek() + term.firstWeek;
    const weeks = dayjs(events[events.length - 1].date).isoWeek() - weekOffset + 1;
    let lastIndex = 0;

    for (let i = 0; i < weeks; i++) {
        let week = weekOffset + i;
        let weekEvents = events.filter(e => dayjs(e.date).isoWeek() == week);

        if (weekEvents.length == 0) {
            let emptyEvent = new Event();
            emptyEvent.date = dayjs().isoWeek(week + 1).startOf("week").toDate();

            events.splice(lastIndex, 0, emptyEvent);
            lastIndex++;
        } else {
            lastIndex += weekEvents.length;
        }
    }

    // Add placeholder events for phases at the right position in the events array

    lastIndex = 0;

    for (let i = 0; i < weeks; i++) {
        let week = weekOffset + i;
        let weekEvents = events.filter(e => dayjs(e.date).isoWeek() == week);
        let phase = phases.filter(p => dayjs(p.dateFrom).isoWeek() == week);

        if (phase && phase.length > 0) {
            let phaseEvent = new Event();
            phaseEvent.title = phase[0].title;
            phaseEvent.id = "PHASE";
            phaseEvent.date = dayjs().isoWeek(week + 1).startOf("week").toDate();

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

