<script lang="ts">
	import dayjs from "dayjs";
	import markdownit from "markdown-it";
	import advancedFormat from "dayjs/plugin/advancedFormat";
	import type { Event } from "$lib/types/event";
	import { EventType, LocationType } from "$lib/types/event";

	dayjs.extend(advancedFormat);

	export let event: Event;
	const date = dayjs(event.date).format("MMMM Do[, at] h:mm a");
	const milestone = event.type == EventType.Checkpoint || event.type == EventType.Cutoff;
	let dateText = "";

	if (event.type == EventType.Checkpoint || event.type == EventType.Cutoff) {
		dateText = "Due " + date;
	} else if (dayjs().isAfter(dayjs(event.date))) {
		dateText = "Took place on " + date;
	} else {
		dateText = "Takes place on " + date;
	}

	const md = markdownit();
	let description = md.render(event.description);
	description = description.replace(
		/<ul>/g,
		'<ul class="flex flex-col gap-2 list-disc list-inside">'
	);
	description = description.replace(
		/<ol>/g,
		'<ol class="flex flex-col gap-2 list-decimal list-inside">'
	);
</script>

<div
	class="relative border-solid border rounded-xl border-gray-300 shadow-lg px-8 pt-6 pb-8"
	class:bg-white={!milestone}
	class:bg-pink-100={milestone}
>
	<div class="absolute top-4 right-4 flex items-center justify-center w-6 h-6">
		<a
			class="text-gray-600 hover:text-techlabspink transition"
			target="_blank"
			rel="noopener noreferrer"
			href="/calendar/{event.id}"><i class="bi-calendar-plus-fill text-lg" /></a
		>
	</div>

	<div>
		<div class="flex flex-row items-center justify-center w-full mb-2">
			{#if event.type == EventType.Event}
				<div class="flex flex-row gap-2 mx-auto">
					<div><i class="bi-calendar-event-fill text-3xl text-techlabspink" /></div>
					{#if event.location.type == LocationType.Online}
						<div><i class="bi-laptop-fill text-3xl text-techlabspink" /></div>
					{:else if event.location.type == LocationType.Offline}
						<div><i class="bi-people-fill text-3xl text-techlabspink" /></div>
					{/if}
				</div>
			{:else if event.type == EventType.Checkpoint}
				<div class="flex flex-row gap-2 mx-auto">
					<div><i class="bi-check-square-fill text-3xl text-techlabspink" /></div>
				</div>
			{:else if event.type == EventType.Cutoff}
				<div class="flex flex-row gap-2 mx-auto">
					<div><i class="bi-exclamation-square-fill text-3xl text-techlabspink" /></div>
				</div>
			{/if}
		</div>
		<h1 class="text-2xl font-bold text-center" class:text-techlabspink={milestone}>
			<a class="hover:underline" href="/event/{event.id}">{event.title}</a>
		</h1>
		<h2 class="text-lg font-light text-center">{dateText}</h2>
		{#if event.isMandatory}
			<h2 class="text-lg font-light text-center">
				This is a <span class="font-normal text-techlabspink">mandatory</span> event!
			</h2>
		{/if}

		<div class="flex flex-col gap-4 mt-4">{@html description}</div>
	</div>

	{#if event.type == EventType.Event}
		<div class="my-8">
			<div class="flex flex-row items-center justify-center">
				<div class="flex-auto"><hr class="border-black" /></div>
				<div class="px-4 text-xs font-bold uppercase">Location</div>
				<div class="flex-auto"><hr class="border-black" /></div>
			</div>
		</div>

		<div
			class="border-2 rounded-lg shadow-sm p-4 hover:border-blue-600 hover:shadow-lg hover:text-blue-600 transition"
		>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href={event.location.url}
				class="flex flex-row gap-4"
			>
				{#if event.location.type == LocationType.Online}
					<div><i class="bi-display-fill" /></div>
				{:else if event.location.type == LocationType.Offline}
					<div><i class="bi-map-fill" /></div>
				{/if}
				<div class="flex flex-col">
					<div class="font-bold">{event.location.name}</div>
					{#if event.location.type == LocationType.Offline}
						<div class="font-light">{event.location.address}</div>
					{/if}
				</div>
			</a>
		</div>
	{/if}
</div>
