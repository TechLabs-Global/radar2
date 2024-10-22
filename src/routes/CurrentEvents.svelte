<script lang="ts">
	import type { Event } from "$lib/types/event";
	import { EventType } from "$lib/types/event";
	import dayjs from "dayjs";
	import EventView from "./EventView.svelte";

	export let events: Event[];

	let nextMilestone = events.filter(
		(event) =>
			(event.type == EventType.Checkpoint || event.type == EventType.Cutoff) &&
			dayjs().isBefore(dayjs(event.date))
	)[0];
	let nextEvent = events.filter(
		(event) => event.type == EventType.Event && dayjs().isBefore(dayjs(event.date))
	)[0];
</script>

<div class="flex flex-col gap-8">
	{#if nextMilestone}
		<EventView event={nextMilestone} />
	{/if}
	{#if nextEvent}
		<EventView event={nextEvent} />
	{/if}
</div>
