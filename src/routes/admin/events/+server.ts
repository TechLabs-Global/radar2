import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

export type Event = {
	id: string;
	title: string;
	date: Date;
	description?: string;
	type: string;
	isPublic: boolean;
	isMandatory: boolean;
	locationId?: string;
};

export async function GET() {
	const db = await database();

	const dbEvents =
		await db.client`SELECT id, title, event_date, description, type, is_public, is_mandatory, location_id FROM events;`;

	const events: Event[] = dbEvents.map((dbEvent) => ({
		id: dbEvent.id,
		title: dbEvent.title,
		date: dbEvent.event_data,
		description: dbEvent.description,
		type: dbEvent.type,
		isPublic: dbEvent.is_public,
		isMandatory: dbEvent.is_mandatory,
		locationId: dbEvent.location_id
	}));

	return json(events);
}

export async function POST({ request }) {
	const db = await database();
	const body = await request.json();

	const requiredFields = ['title', 'eventDate', 'description', 'type', 'isPublic', 'isMandatory'];

	requiredFields.forEach((field) => {
		if (!Object.keys(body).includes(field)) {
			error(400, {
				message: `Missing required field: ${field}`
			});
		}
	});

	const fields = ['title', 'event_date', 'description', 'type', 'is_public', 'is_mandatory'];
	const values = [
		`'${body.title}'`,
		`'${body.eventDate}'`,
		`'${body.description}'`,
		`'${body.type}'`,
		body.isPublic,
		body.isMandatory
	];

	if (body.locationId) {
		fields.push('location_id');
		values.push(body.locationId);
	}

	const queryString = `
		INSERT INTO events (${fields.join(', ')})
		VALUES (${values.join(', ')})
		RETURNING id, title, event_date, description, type, is_public, is_mandatory, location_id;
	`;

	try {
		const dbEvent = await db.client.unsafe(queryString);

		const event = {
			id: dbEvent[0].id,
			title: dbEvent[0].title,
			date: dbEvent[0].event_date,
			description: dbEvent[0].description,
			type: dbEvent[0].type,
			isPublic: dbEvent[0].is_public,
			isMandatory: dbEvent[0].is_mandatory,
			locationId: dbEvent[0].location_id
		};

		return json(event);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
