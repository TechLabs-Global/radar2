<script lang="ts">
	import { page } from "$app/stores";

	const code = $page.status;
	const msg = $page.error!.message;
</script>

<div class="max-w-3xl mt-6 mb-4 mx-2 md:mx-auto">
	<div
		class="relative border-solid border rounded-xl border-gray-300 shadow-lg bg-white px-8 pt-6 pb-8"
	>
		<h1 class="text-2xl font-bold text-center">Error {code}</h1>
		<h2 class="text-lg font-light text-center">{msg}</h2>
	</div>
</div>
