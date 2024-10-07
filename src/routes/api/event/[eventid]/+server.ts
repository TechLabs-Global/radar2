import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Event, Location } from '$lib/types/event';

export async function GET(e) {
    const eventId = e.params.eventid;

    if (!validateEventId(eventId)) {
        return json({ error: "Invalid event ID" }, { status: 400 });
    }

    try {
        const eventsDir = path.resolve("./src/lib/server/content/events");
        const eventFile = path.resolve(eventsDir, `${eventId}.toml`);

        try {
            await access(eventFile);
        } catch (error) {
            return json({ error: "Event not found" }, { status: 404 });
        }

        const content = await fs.readFile(eventFile, "utf-8");
        let event = toml.parse(content) as Event;
        event.id = eventId;

        return json(event);
    } catch (error) {
        console.error("Error reading events", error);
        
        return json({ error: "Internal server error" }, { status: 500 });
    }
}

function validateEventId(eventId: string): boolean {
    return /^[0-9]+_[a-z0-9-_]+$/.test(eventId);
}
