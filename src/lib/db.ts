import postgres from 'postgres';
import { error } from '@sveltejs/kit';
import { Event } from '$lib/types/event';

import type { Phase } from './types/phase';
import { Term } from './types/term';
import type { ConfigItem } from './types/config';
import { dbHost, dbName, dbPassword, dbPort, dbUser, initDb, seedDb } from './environment';

import dbSchema from './schemas/tables.sql?raw';
import dbSeed from './schemas/test_data.sql?raw';
import { Location } from './types/location';

class DB {
	private client: ReturnType<typeof postgres>;

	constructor(host: string, port: number, database: string, username: string, password: string) {
		this.client = postgres({
			host,
			port,
			database,
			username,
			password,
			transform: postgres.camel
		});
	}

	public async init() {
		if (initDb) {
			console.log('Initializing database...');
			await this.client.unsafe(dbSchema);
		}
		if (seedDb) {
			console.log('Seeding database...');
			await this.client.unsafe(dbSeed);
		}
	}

	public async events(): Promise<Event[]> {
		try {
			const rawEvents = await this.client`
                SELECT
                    events.*,
                    locations.name AS location_name,
                    locations.address AS location_address,
                    locations.url AS location_url
                FROM events
                JOIN locations ON events.location_id = locations.id
                ORDER BY event_date ASC
            `;

			const events: Event[] = rawEvents.map((rawEvent) => ({
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
					type: rawEvent.locationType
				}
			}));

			// Why this check? Returning an empty array is not an error
			if (!events) {
				error(404, {
					message: 'Events not found'
				});
			}

			return events;
		} catch (e) {
			console.error('Error reading events', e);

			error(500, {
				message: 'Internal server error'
			});
		}
	}

	public async event(eventId: string): Promise<Event> {
		try {
			const rawEvents = await this.client`
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

			const events: Event[] = rawEvents.map((rawEvent) => ({
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
					type: rawEvent.locationType
				}
			}));

			if (!events || events.length === 0) {
				error(404, {
					message: 'Event not found'
				});
			}

			return events[0];
		} catch (e) {
			console.error('Error reading events', e);

			error(500, {
				message: 'Internal server error'
			});
		}
	}

	public async phases(): Promise<Phase[]> {
		try {
			const phases = await this.client<Phase[]>`
                SELECT * FROM phases
                ORDER BY date_from ASC
            `;

			if (!phases) {
				error(404, {
					message: 'Phases not found'
				});
			}

			return phases;
		} catch (e) {
			console.error('Error reading phases', e);

			error(500, {
				message: 'Internal server error'
			});
		}
	}

	public async location(): Promise<Location> {
		try {
			const rawLocation = await this.client<ConfigItem[]>`
				SELECT * FROM config
				WHERE key like 'location.%'
			`;

			if (!rawLocation) {
				error(404, {
					message: 'Location not found'
				});
			}

			let location = new Location();

			rawLocation.forEach(({ key, value }) => {
				switch (key) {
					case 'location.name':
						location.name = value;
						break;
					case 'location.logo':
						location.logo = value;
						break;
				}
			});

			if (!location.name || !location.logo) {
				error(404, {
					message: 'Location not found'
				});
			}

			return location;
		} catch (e) {
			console.error('Error reading location', e);

			error(500, {
				message: 'Internal server error'
			});
		}
	}

	public async term(): Promise<Term> {
		try {
			const rawConfig = await this.client<ConfigItem[]>`
                SELECT * FROM config
                WHERE key LIKE 'term.%'
            `;

			if (!rawConfig) {
				error(404, {
					message: 'Config not found'
				});
			}

			let term = new Term();

			rawConfig.forEach(({ key, value }) => {
				switch (key) {
					case 'term.title':
						term.title = value;
						break;
					case 'term.batchNumber':
						term.batchNumber = parseInt(value);
						break;
					case 'term.startDate':
						term.startDate = new Date(value);
						break;
					case 'term.firstWeek':
						term.firstWeek = parseInt(value);
						break;
				}
			});

			if (
				!term.title ||
				term.batchNumber === undefined ||
				!term.startDate ||
				term.firstWeek === undefined
			) {
				error(404, {
					message: 'Term not found'
				});
			}

			return term;
		} catch (e) {
			console.error('Error reading term config', e);

			error(500, {
				message: 'Internal server error'
			});
		}
	}
}

let databaseSingleton: DB;
const initializeDb = async () => {
	if (!databaseSingleton) {
		databaseSingleton = new DB(dbHost, dbPort, dbName, dbUser, dbPassword);
		await databaseSingleton.init();
	}
	return databaseSingleton;
};

export default initializeDb;
export type { DB };
