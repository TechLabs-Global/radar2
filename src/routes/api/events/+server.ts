import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Event, Location } from '$lib/types/event';

export async function GET() {
    try {
        const eventsDir = path.resolve("./src/lib/server/content/events");
        let eventsFiles = await fs.readdir(eventsDir);

        let events = await Promise.all(
            eventsFiles.map(async (file: string) => {
                const content = await fs.readFile(path.resolve(eventsDir, file), "utf-8");
                return toml.parse(content) as Event;
            }
        ));

        events.sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime());

        return json(events);
    } catch (error) {
        console.error("Error reading events", error);
    }
}
