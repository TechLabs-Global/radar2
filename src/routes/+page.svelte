<script>
    import EventList from './EventList.svelte';
	import CurrentEvents from './CurrentEvents.svelte';
</script>

<div class="flex flex-row flex-wrap lg:flex-nowrap max-w-5xl mt-6 mb-4 mx-2 lg:mx-auto">
    <div class="shrink-0 w-full lg:w-1/3 pb-8 lg:pr-8"><EventList /></div>
    <div class="shrink-0 w-full lg:w-2/3"><CurrentEvents /></div>
</div>
