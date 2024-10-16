import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Event, Location } from '$lib/types/event';
import sql from '$lib/db';

export async function GET() {
    try {
        const rawEvents = await sql<any[]>`
            SELECT
                events.*,
                locations.name AS location_name,
                locations.address AS location_address,
                locations.url AS location_url
            FROM events
            JOIN locations ON events.location_id = locations.id
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

        if (!events) {
            error(404, {
                message: "Events not found",
            });
        }
    
        return json(events);
    } catch (e) {
        console.error("Error reading events", e);

        error(500, {
            message: "Internal server error",
        });
    }

    // try {
    //     const eventsDir = path.resolve("./src/lib/server/content/events");
    //     let eventsFiles = await fs.readdir(eventsDir);

    //     let events = await Promise.all(
    //         eventsFiles.map(async (file: string) => {
    //             const content = await fs.readFile(path.resolve(eventsDir, file), "utf-8");
    //             let event = toml.parse(content) as Event;
    //             event.id = file.replace(".toml", "");
                
    //             return event;
    //         }
    //     ));

    //     events.sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime());

    //     return json(events);
    // } catch (error) {
    //     console.error("Error reading events", error);

    //     return json({ error: "Internal server error" }, { status: 500 });
    // }
}
