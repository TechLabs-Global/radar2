<script lang="ts">
	import EventList from "./EventList.svelte";
	import CurrentEvents from "./CurrentEvents.svelte";
	import type { Event, Location } from "$lib/types/event";
	import type { Term } from "$lib/types/term";
	import type { Phase } from "$lib/types/phase";

	async function fetchData(): Promise<[Event[], Term, Phase[]]> {
		const resEvents = await fetch("/api/events");
		const events: Event[] = await resEvents.json();

		const resInstance = await fetch("/api/instance");
		const resInstanceJson = await resInstance.json();
		// const location: Location = resInstanceJson.location;
		const term: Term = resInstanceJson.term;

		const resPhases = await fetch("/api/phases");
		const phases: Phase[] = await resPhases.json();

		return [events, term, phases];
	}
</script>

<div class="flex flex-row flex-wrap lg:flex-nowrap max-w-5xl mt-6 mb-4 mx-2 lg:mx-auto">
	{#await fetchData()}
		<div>Loading...</div>
	{:then [events, term, phases]}
		<div class="shrink-0 w-full lg:w-1/3 pb-8 lg:pr-8"><EventList {events} {term} {phases} /></div>
		<div class="shrink-0 w-full lg:w-2/3"><CurrentEvents {events} /></div>
	{:catch error}
		<div>Error: {error.message}</div>
	{/await}
</div>
