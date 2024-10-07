<script lang="ts">
	import type { Term } from "$lib/types/term";

	export let term: Term;
</script>

<header class="flex items-center justify-center h-14 max-w-5xl mx-2 lg:mx-auto pt-4">
	<div class="flex flex-row items-center justify-center w-full">
		<div class="flex flex-row mr-4">
			<img src="/logos/logo.svg" alt="TechLabs Logo" class="h-12" />
			<img src="/logos/logo-dus.svg" alt="TechLabs Düsseldorf Logo" class="h-12" />
		</div>
		<div class="font-bold">{term.title}</div>
		<div class="flex-auto"></div>
		<div class="flex flex-row gap-6 items-center justify-center max-md:hidden">
			<div><a class="hover:underline" href="/">Timeline</a></div>
			<div><a class="hover:underline" href="/faq">FAQ</a></div>
			<div class="border border-gray-300 rounded-md shadow-md p-1.5 text-white bg-techlabspink hover:shadow-lg hover:text-techlabspink hover:bg-pink-100 transition"><a href="/apply">Apply</a></div>
		</div>
		<div><i class="bi-list text-3xl md:hidden" /></div>
	</div>
</header>
