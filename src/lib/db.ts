import postgres from 'postgres';
import { error } from "@sveltejs/kit";
import { Event, Location } from "$lib/types/event";
import type { Phase } from "./types/phase";
import { Term } from "./types/term";
import type { ConfigItem } from "./types/config";

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

    static async event(eventId: string): Promise<Event> {
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
        
            return events[0];
        } catch (e) {
            console.error("Error reading events", e);
    
            error(500, {
                message: "Internal server error",
            });
        }
    }

    static async phases(): Promise<Phase[]> {
        try {
            const phases = await sql<Phase[]>`
                SELECT * FROM phases
                ORDER BY date_from ASC
            `;
    
            if (!phases) {
                error(404, {
                    message: "Phases not found",
                });
            }
        
            return phases;
        } catch (e) {
            console.error("Error reading phases", e);
    
            error(500, {
                message: "Internal server error",
            });
        }
    }

    static async term(): Promise<Term> {
        try {
            const rawConfig = await sql<ConfigItem[]>`
                SELECT * FROM config
                WHERE key LIKE 'term.%'
            `;
    
            if (!rawConfig) {
                error(404, {
                    message: "Config not found",
                });
            }
    
            let term = new Term();
    
            rawConfig.forEach(({key, value}) => {
                switch (key) {
                    case "term.title":
                        term.title = value;
                        break;
                    case "term.batchNumber":
                        term.batchNumber = parseInt(value);
                        break;
                    case "term.startDate":
                        term.startDate = new Date(value);
                        break;
                    case "term.firstWeek":
                        term.firstWeek = parseInt(value);
                        break;
                }
            });
    
            if (!term.title || term.batchNumber === undefined || !term.startDate || term.firstWeek === undefined) {
                error(404, {
                    message: "Term not found",
                });
            }
    
            return term;
        } catch (e) {
            console.error("Error reading term config", e);
    
            error(500, {
                message: "Internal server error",
            });
        }
    }
}
