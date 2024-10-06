import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Event, Location } from '$lib/types/event';

export async function GET(event) {
    try {
        const eventsDir = path.resolve("./src/lib/server/content/events");
        let eventsFiles = await fs.readdir(eventsDir);

        eventsFiles.sort();

        const events = await Promise.all(
            eventsFiles.map(async (file: string) => {
                const content = await fs.readFile(path.resolve(eventsDir, file), "utf-8");
                return toml.parse(content) as Event;
            }
        ));

        return json(events);
    } catch (error) {
        console.error("Error reading events");
    }
}
