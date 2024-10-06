<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app bg-gray-100">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>
