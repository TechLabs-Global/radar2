<script>
    import EventList from './EventList.svelte';
	import CurrentEvents from './CurrentEvents.svelte';
</script>

<div class="flex flex-row flex-wrap lg:flex-nowrap gap-4 m-4 lg:mr-8">
    <div class="shrink-0 w-full lg:w-1/3"><EventList /></div>
    <div class="shrink-0 w-full lg:w-2/3"><CurrentEvents /></div>
</div>
