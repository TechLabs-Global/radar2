<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app static text-gray-800 bg-stone-50 min-h-screen h-full pb-4">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="bottom-0 w-full text-center mt-12">
		<p class="text-sm text-gray-600">TechLabs Radar 2.0 created by TechLabs Düsseldorf e. V.</p>
		<p class="text-sm text-gray-600">GitHub – Contact – Imprint</p>
	</footer>
</div>
