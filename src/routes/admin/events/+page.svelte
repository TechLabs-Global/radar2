<script lang="ts">
    import dayjs from "dayjs";
	import type { Event } from "$lib/types/event";
	import AdminView from "../AdminView.svelte";

    let error = "";
    let evenRow = true;

    async function fetchEvents(): Promise<Event[]> {
        const resEvents = await fetch("/api/events");
        const events: Event[] = await resEvents.json();

        return events;
    }

    async function deleteEvent(event_id: string) {
        return async function() {
            const res = await fetch(`/admin/events/${event_id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                error = "Could not delete event.";
            }
        }
    }

    function rowColor(): string {
        evenRow = !evenRow;
        return evenRow ? "bg-gray-200" : "";
    }
</script>

<AdminView mode="events" {error}>
    <div class="p-6 w-full bg-white border-solid border rounded-xl border-gray-300 shadow-lg">
        <div class="flex justify-end mb-4">
            <div class="border border-gray-300 rounded-md shadow-md p-1.5 text-white bg-techlabspink hover:shadow-lg hover:text-techlabspink hover:bg-pink-100 transition"><a href="">New</a></div>
        </div>

        {#await fetchEvents()}
            <div>Loading...</div>
        {:then events} 
            <table class="table-auto w-full">
                <thead>
                    <tr class="border-b-2 border-gray-600 bg-gray-200">
                        <th class="p-1">Date</th>
                        <th class="p-1">Title</th>
                        <th class="p-1">Type</th>
                        <th class="p-1">Public?</th>
                        <th class="p-1">Mandatory?</th>
                        <th class="p-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {#each events as event}
                        <tr class="{rowColor()}">
                            <td class="p-1">{dayjs(event.date).format("DD.MM.YYYY HH:mm")}</td>
                            <td class="p-1">{event.title}</td>
                            <td class="p-1">{event.type}</td>
                            <td class="p-1">{event.isPublic ? "Yes" : "No"}</td>
                            <td class="p-1">{event.isMandatory ? "Yes" : "No"}</td>
                            <td class="p-1">
                                <div class="flex flex-row gap-4">
                                    <a href="/admin/event/{event.id}" title="Edit event"><i class="bi-pencil-square text-xl hover:text-techlabspink transition" /></a>
                                    <button on:click={deleteEvent(event.id)} title="Delete event"><i class="bi-trash3-fill text-xl hover:text-techlabspink transition" /></button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/await}
    </div>
</AdminView>
