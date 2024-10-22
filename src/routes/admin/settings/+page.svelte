<script lang="ts">
	import AdminView from "../AdminView.svelte";

</script>

<AdminView mode="settings">
    <div class="p-6 w-full bg-white border-solid border rounded-xl border-gray-300 shadow-lg">
        <table class="table-auto">
            <tbody>
                <tr>
                    <td class="pr-4 py-1 font-bold">Location Settings</td>
                    <td class="py-1"></td>
                </tr>
                <tr>
                    <td class="pr-4 py-1">Name</td>
                    <td class="py-1"><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" /></td>
                </tr>
                <tr>
                    <td class="pr-4 py-1">Logo</td>
                    <td class="py-1"><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" /></td>
                </tr>
                <tr>
                    <td class="pr-4 py-1">Contact URL</td>
                    <td class="py-1"><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" /></td>
                </tr>
                <tr>
                    <td class="pr-4 py-1">Imprint URL</td>
                    <td class="py-1"><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" /></td>
                </tr>

                <tr>
                    <td class="pr-4 py-1 font-bold">Term Settings</td>
                    <td class="py-1"></td>
                </tr>
                <tr>
                    <td class="pr-4 py-1">Title</td>
                    <td class="py-1"><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" /></td>
                </tr>
                <tr>
                    <td class="pr-4 py-1">Batch Number</td>
                    <td class="py-1"><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" /></td>
                </tr>
                <tr>
                    <td class="pr-4 py-1">Start Date</td>
                    <td class="py-1"><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" placeholder="dd.mm.yyyy" /></td>
                </tr>
                <tr>
                    <td class="pr-4 py-1">First Week Number</td>
                    <td class="py-1"><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" /></td>
                </tr>
            </tbody>
        </table>

        <div class="flex justify-end mt-4">
            <div class="border border-gray-300 rounded-md shadow-md p-1.5 text-white bg-techlabspink hover:shadow-lg hover:text-techlabspink hover:bg-pink-100 transition"><a href="">Save</a></div>
        </div>
    </div>
</AdminView>
