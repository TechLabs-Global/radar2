<script lang="ts">
    export let mode: string = "";

    const active_mode_classes = "font-bold";
</script>

<div class="flex flex-row gap-6 overflow-x-auto p-6 w-full bg-white border-solid border rounded-xl border-gray-300 shadow-lg">
    <div class="min-w-fit w-full font-bold">Admin Interface</div>
    <div class="flex flex-row gap-6">
        <a class="hover:underline {mode == "events" ? active_mode_classes : "" }" href="/admin/events">Events</a>
        <a class="hover:underline {mode == "pages" ? active_mode_classes : "" }" href="/admin/pages">Pages</a>
        <a class="hover:underline {mode == "settings" ? active_mode_classes : "" }" href="/admin/settings">Settings</a>
    </div>
</div>
