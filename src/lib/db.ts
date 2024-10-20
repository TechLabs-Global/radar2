import postgres from 'postgres';
import { error } from "@sveltejs/kit";
import { Event, Location } from "$lib/types/event";

import { dbHost, dbName, dbPassword, dbPort, dbUser } from './environment';

const sql = postgres({
	host: dbHost,
	port: dbPort,
	database: dbName,
	username: dbUser,
	password: dbPassword,
	transform: postgres.camel
});

export default sql;

export class DB {
    static async events(): Promise<any[]> {
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
