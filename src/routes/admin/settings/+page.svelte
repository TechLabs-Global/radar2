<script lang="ts">
	import AdminView from "../AdminView.svelte";

</script>

<AdminView mode="settings">
    <div class="p-6 w-full bg-white border-solid border rounded-xl border-gray-300 shadow-lg">
        <div class="flex flex-col gap-4">
            <div>
                <div><h2 class="font-bold">Location Settings</h2></div>
                <div></div>
            </div>

            <div class="flex flex-row gap-12">
                <div>Name</div>
                <div><input class="border rounded-md border-gray-300 shadow-md p-1 min-w-96" /></div>
            </div>

            <div>
                <div>Logo</div>
                <div></div>
            </div>

            <div>
                <div><h2 class="font-bold">Term Settings</h2></div>
                <div></div>
            </div>

            <div>
                <div>Title</div>
                <div></div>
            </div>

            <div>
                <div>Batch Number</div>
                <div></div>
            </div>

            <div>
                <div>Start Date</div>
                <div></div>
            </div>

            <div>
                <div>First Week Number</div>
                <div></div>
            </div>
        </div>
    </div>
</AdminView>
