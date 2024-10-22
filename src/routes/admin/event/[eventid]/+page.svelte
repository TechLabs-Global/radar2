<script lang="ts">
    import { page } from "$app/stores";
    import dayjs from "dayjs";
    import { Carta, MarkdownEditor} from "carta-md";
    import "carta-md/default.css";
    import { DateInput } from "date-picker-svelte";
    import { Event, Location } from "$lib/types/event";
    import { EventType, LocationType } from "$lib/types/event";
	import AdminView from "../../AdminView.svelte";

    const eventId = $page.params.eventid;

    const carta = new Carta();

    let event = new Event();
    let locations: Location[] = [];

    async function fetchData(eventId: string): Promise<void> {
        if (eventId == "new") {
            event.title = "New Event";
        } else {
            const res = await fetch(`/api/event/${eventId}`);

            if (!res.ok) {
                throw new Error(res.statusText);
            }

            event = await res.json();
        }        

        locations = [
            {
				id: "1",
				name: "Online",
				type: LocationType.Online,
				address: "",
				url: ""
			},
            {
				id: "2",
				name: "Offline",
				type: LocationType.Offline,
				address: "",
				url: ""
			}
        ];
        // const resLocations = await fetch("/admin/locations");
        // locations = await resLocations.json();
    }
</script>

<dialog id="newLocationDialog" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            New Location
                        </h3>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                <input type="text" class="border rounded-md border-gray-300 shadow-md p-1 w-full" placeholder="Name" />
                            </p>
                            <p class="text-sm text-gray-500">
                                <input type="text" class="border rounded-md border-gray-300 shadow-md p-1 w-full" placeholder="Address" />
                            </p>
                            <p class="text-sm text-gray-500">
                                <input type="text" class="border rounded-md border-gray-300 shadow-md p-1 w-full" placeholder="URL" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-techlabspink text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:ml-3 sm:w-auto sm:text-sm" onclick="document.getElementById('newLocationDialog').close()">
                    Save
                </button>
                <button class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onclick="document.getElementById('newLocationDialog').close()">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</dialog>

<AdminView mode="events">
    {#await fetchData(eventId)}
        <div>Loading...</div>
    {:then}
        <div class="relative border-solid border rounded-xl border-gray-300 shadow-lg bg-white px-8 pt-6 pb-8">
            <div class="flex flex-col gap-4">
                <h1 class="text-2xl font-bold text-center"><input type="text" class="border rounded-md border-gray-300 shadow-md p-1 w-full text-center" value={event.title} /></h1>
                <div class="flex flex-row gap-4 items-center justify-center">
                    <DateInput bind:value={event.date} format="dd.MM.yyyy HH:mm" timePrecision="second" />
                    <select bind:value={event.type} class="border rounded-md border-gray-300 shadow-md p-1">
                        <option value={EventType.Event}>Event</option>
                        <option value={EventType.Checkpoint}>Checkpoint</option>
                        <option value={EventType.Cutoff}>Cutoff</option>
                    </select>
                </div>

                <div class="flex flex-row gap-1 items-center justify-center">
                    <select bind:value={event.location.id} class="w-52 border rounded-md border-gray-300 shadow-md p-1">
                        {#each locations as location}
                            <option value={location.id}>{location.name}</option>
                        {/each}
                    </select>
                    <button class="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md shadow-md p-1.5  bg-white hover:shadow-lg hover:text-techlabspink hover:bg-pink-100 transition"><i class="bi-plus-lg" /></button>
                </div>

                <MarkdownEditor {carta} value={event.description} />

                <div class="flex flex-row gap-4">
                    <div class="flex flex-row gap-1 items-center">
                        <input type="checkbox" id="isPublic" bind:checked={event.isPublic} class="w-4 h-4" />
                        <label for="isPublic">Public?</label>
                    </div>
                    <div class="flex flex-row gap-1 items-center">
                        <input type="checkbox" id="isMandatory" bind:checked={event.isMandatory} class="w-4 h-4" />
                        <label for="isMandatory">Mandatory?</label>
                    </div>
                </div>
            </div>

            <div class="flex justify-end mt-8">
                <div class="border border-gray-300 rounded-md shadow-md p-1.5 text-white bg-techlabspink hover:shadow-lg hover:text-techlabspink hover:bg-pink-100 transition"><button on:click={saveEvent()}>Save</button></div>
            </div>
        </div>
    {:catch error}
        <div>Error: {error.message}</div>
    {/await}
</AdminView>

<style>
    :global(.carta-font-code) {
        font-family: 'Courier New', Courier, monospace;
        font-size: 1em;
    }
</style>