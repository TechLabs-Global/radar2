<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app static bg-stone-50 h-screen">
	<Header />

	<main>
		<slot />
	</main>

	<footer class="absolute bottom-0 w-full text-center mb-4">
		<p class="text-sm text-gray-600">TechLabs Radar 2.0 created by TechLabs Düsseldorf e. V.</p>
		<p class="text-sm text-gray-600">GitHub – Contact – Imprint</p>
	</footer>
</div>
