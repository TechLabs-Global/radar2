import { error, json } from '@sveltejs/kit';
import database from '$lib/db';
import { validateEventId } from '../../../api/event/[eventid]/+server';

export async function GET({ params }) {
	const db = await database();

	const event = await db.client`SELECT * FROM events WHERE id = ${params.eventid};`;

	return json(event);
}

export async function PUT({ params, request }) {
	const db = await database();

	const body = await request.json();

	const queryStringParts: string[] = [];
	queryStringParts.push('UPDATE events SET');

	const updateParts: string[] = [];
	Object.keys(body).forEach((key) => {
		if (key !== 'id') {
			updateParts.push(`${key} = '${body[key]}'`);
		}
	});
	queryStringParts.push(updateParts.join(', '));
	queryStringParts.push(`WHERE id = '${params.eventid}' RETURNING *;`);

	const queryString = queryStringParts.join(' ');

	try {
		const event = await db.client.unsafe(queryString);

		return json(event);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}

export async function DELETE({ params }) {
	const db = await database();

	if (!validateEventId(params.eventid)) {
		error(400, {
			message: 'Invalid event ID'
		});
	}

	try {
		const response = await db.client`DELETE FROM events WHERE id = ${params.eventid};`;

		return json({ eventId: params.eventid, deletedEntries: response.count });
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
