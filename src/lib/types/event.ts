import sql from "$lib/db";
import { error, json } from "@sveltejs/kit";

export enum EventType {
    Event = "event",
    Checkpoint = "checkpoint",
    Cutoff = "cutoff",
}

export class Event {
    id!: string;
    title!: string;
    date!: Date;
    description: string = "";
    type: EventType = EventType.Event;
    isPublic: boolean = true;
    isMandatory: boolean = false;
    location: Location = new Location();

    static async all(): Promise<Event[]> {
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
        
            return events;
        } catch (e) {
            console.error("Error reading events", e);
    
            error(500, {
                message: "Internal server error",
            });
        }
    }
}

export enum LocationType {
    Offline = "offline",
    Online = "online",
}

export class Location {
    name!: string;
    address: string = "";
    url: string = "";
    type: LocationType = LocationType.Offline;
}
