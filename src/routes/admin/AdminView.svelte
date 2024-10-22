<script lang="ts">
	import AdminNavigation from "./AdminNavigation.svelte";

    export let mode: string = "";
</script>

<div class="flex flex-col gap-8 max-w-5xl mt-6 mb-4 mx-2 lg:mx-auto">
    <AdminNavigation {mode} />
    
    <slot />
</div>
