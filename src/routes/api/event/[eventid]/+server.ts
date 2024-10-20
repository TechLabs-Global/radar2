import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Event, Location } from '$lib/types/event';
import sql, { DB } from '$lib/db';

export async function GET(e) {
    const eventId: string = e.params.eventid;

    if (!validateEventId(eventId)) {
        error(400, {
            message: "Invalid event ID",
        });
    }

    const event = await DB.event(eventId);

    return json(event);
}

function validateEventId(eventId: string): boolean {
    // Check if the event ID is a UUID
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(eventId);
}
