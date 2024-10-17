import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Event, Location } from '$lib/types/event';
import sql from '$lib/db';

export async function GET(e) {
    const eventId: string = e.params.eventid;

    if (!validateEventId(eventId)) {
        error(400, {
            message: "Invalid event ID",
        });
    }

    try {
        const rawEvents = await sql<any[]>`
            SELECT
                events.*,
                locations.name AS location_name,
                locations.address AS location_address,
                locations.url AS location_url
            FROM events
            JOIN locations
                ON events.location_id = locations.id
                AND events.id = ${eventId}
            ORDER BY event_date ASC
        `;

        const events = rawEvents.map((rawEvent) => {
            let event = {
                id: rawEvent.id,
                title: rawEvent.title,
                date: rawEvent.eventDate,
                description: rawEvent.description,
                type: rawEvent.type,
                isPublic: rawEvent.isPublic,
                isMandatory: rawEvent.isMandatory,
                location: {
                    name: rawEvent.locationName,
                    address: rawEvent.locationAddress,
                    url: rawEvent.locationUrl,
                } as Location,
            } as Event;

            return event;
        });

        if (!events || events.length === 0) {
            error(404, {
                message: "Event not found",
            });
        }
    
        return json(events[0]);
    } catch (e) {
        console.error("Error reading events", e);

        error(500, {
            message: "Internal server error",
        });
    }
}

function validateEventId(eventId: string): boolean {
    // Check if the event ID is a UUID
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(eventId);
}
