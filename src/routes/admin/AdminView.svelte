<script lang="ts">
	import AdminNavigation from "./AdminNavigation.svelte";

    export let mode: string = "";
    export let error: string = "";
</script>

<div class="flex flex-col gap-8 max-w-5xl mt-6 mb-4 mx-2 lg:mx-auto">
    <AdminNavigation {mode} />

    {#if error}
        <div class="p-6 w-full bg-pink-100 border-solid border rounded-xl border-gray-300 shadow-lg">
            <div class="flex flex-row gap-4 items-center">
                <i class="bi-exclamation-square-fill text-techlabspink text-2xl" />
                <p>{error}</p>
            </div>
        </div>
    {/if}
    
    <slot />
</div>
