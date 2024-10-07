<script lang="ts">
    import dayjs from "dayjs";
    import advancedFormat from "dayjs/plugin/advancedFormat";
    import type { Event, Location } from "$lib/types/event";

    dayjs.extend(advancedFormat);

    export let event: Event;
    let date = dayjs(event.date).format("MMMM Do[, at] h:mm a");
    let dateText = "";

    if (dayjs().isAfter(dayjs(event.date))) {
        dateText = "Took place on " + date;
    } else {
        dateText = "Takes place on " + date;
    }
</script>

<div class="m-4">
    <div>
        <div class="flex flex-row w-full mb-4">
            <div class="flex flex-row gap-2 mx-auto">
                <div><i class="bi-calendar-event-fill text-3xl text-techlabspink" /></div>
                <div><i class="bi-people-fill text-3xl text-techlabspink" /></div>
            </div>
        </div>
        <h1 class="text-2xl font-bold text-center">{event.title}</h1>
        <h2 class="text-lg font-light text-center">{dateText}</h2>
        {#if event.isMandatory}
            <h2 class="text-lg font-light text-center">This is a mandatory event!</h2>
        {/if}

        <p class="mt-8 mb-2">This is where your Digital Shaper Journey will start. We'll give you a summary on all you need to know to master your track.</p>
        <p class="mb-2">Our topics include:</p>
        <ol class="list-decimal mb-2">
            <li>Key Facts regarding TechLabs, the Digital Shaper program, certificate and community</li>
            <li>Administrative Topics – your onboarding to our toolset, communication channels, regular meetings & next steps</li>
            <li>Track Get-Together – you'll meet other participants in the track you're planning to choose, and can ask the Track Leads for more information</li>
        </ol>
        <p>Our goal is for everybody to have a clear understanding about TechLabs Dortmund and your Journey!</p>
    </div>

    <div class="mt-8">
        <div class="flex flex-row items-center justify-center">
            <div class="flex-auto"><hr class="border-black"></div>
            <div class="px-4 text-xs font-bold uppercase">Location</div>
            <div class="flex-auto"><hr class="border-black"></div>
        </div>
    </div>
</div>
