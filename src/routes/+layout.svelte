<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import type { Location } from '$lib/types/location';
	import type { Term } from '$lib/types/term';

	async function fetchTerm() {
        const res = await fetch("/api/instance");
		const resJson = await res.json();
		const location: Location = resJson.location;
        const term: Term = resJson.term;

        return [location, term];
    }
</script>

<div class="app static min-h-screen h-full pb-4">
	{#await fetchTerm()}
		<div>Loading...</div>
	{:then [location, term]}
		<Header {location} {term} />

		<main>
			<slot />
		</main>

		<footer class="bottom-0 w-full text-center mt-12">
			<p class="text-sm text-gray-600">TechLabs Radar 2.0</p>
			<p class="text-sm text-gray-600">Created by TechLabs Düsseldorf e. V. & TechLabs Ruhr e. V.</p>
			<p class="text-sm text-gray-600">GitHub – Contact – Imprint</p>
		</footer>
	{:catch error}
		<div>Error: {error.message}</div>
	{/await}
</div>
