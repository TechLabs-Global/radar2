import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

import { validateEventId } from '$lib/validators';
import type { Event } from '../+server';

export async function GET({ params }) {
	const db = await database();
	const eventId = params.eventid;

	if (!validateEventId(eventId)) {
		error(400, {
			message: 'Invalid event ID'
		});
	}

	const dbEvent =
		await db.client`SELECT id, title, event_date, description, type, is_public, is_mandatory, location_id FROM events WHERE id = ${eventId};`;

	const event: Event = {
		id: dbEvent[0].id,
		title: dbEvent[0].title,
		date: dbEvent[0].eventDate,
		description: dbEvent[0].description,
		type: dbEvent[0].type,
		isPublic: dbEvent[0].isPublic,
		isMandatory: dbEvent[0].isMandatory,
		locationId: dbEvent[0].locationId
	};

	return json(event);
}

export async function PUT({ params, request }) {
	const db = await database();
	const eventId = params.eventid;

	if (!validateEventId(eventId)) {
		error(400, {
			message: 'Invalid event ID'
		});
	}

	const body = await request.json();

	const allowedKeys = [
		'title',
		'eventDate',
		'description',
		'type',
		'isPublic',
		'isMandatory',
		'locationId'
	];

	const updateParts = Object.keys(body)
		.filter(allowedKeys.includes)
		.map((key) => `${key} = '${body[key]}'`)
		.join(', ');

	const queryString = `
		UPDATE events SET
		${updateParts}
		WHERE id = '${eventId}'
		RETURNING id, title, event_date, description, type, is_public, is_mandatory, location_id;
	`;

	try {
		const dbEvent = await db.client.unsafe(queryString);

		const event: Event = {
			id: dbEvent[0].id,
			title: dbEvent[0].title,
			date: dbEvent[0].eventDate,
			description: dbEvent[0].description,
			type: dbEvent[0].type,
			isPublic: dbEvent[0].isPublic,
			isMandatory: dbEvent[0].isMandatory,
			locationId: dbEvent[0].locationId
		};

		return json(event);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}

export async function DELETE({ params }) {
	const db = await database();
	const eventId = params.eventid;

	if (!validateEventId(eventId)) {
		error(400, {
			message: 'Invalid event ID'
		});
	}

	try {
		const { count: deletedEntries } = await db.client`DELETE FROM events WHERE id = ${eventId};`;

		return json({ eventId, deletedEntries });
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
