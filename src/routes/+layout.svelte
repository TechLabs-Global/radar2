<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import type { Term } from '$lib/types/term';

	async function fetchTerm() {
        const res = await fetch("/api/term");
        const term: Term = await res.json();

        return term;
    }
</script>

<div class="app static text-gray-800 bg-stone-50 min-h-screen h-full pb-4">
	{#await fetchTerm()}
		<div>Loading...</div>
	{:then term}
		<Header {term} />

		<main>
			<slot />
		</main>

		<footer class="bottom-0 w-full text-center mt-12">
			<p class="text-sm text-gray-600">TechLabs Radar 2.0 created by TechLabs Düsseldorf e. V.</p>
			<p class="text-sm text-gray-600">GitHub – Contact – Imprint</p>
		</footer>
	{:catch error}
		<div>Error: {error.message}</div>
	{/await}
</div>
