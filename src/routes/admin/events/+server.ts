import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

export async function GET() {
	const db = await database();

	const allEvents = await db.client`SELECT * FROM events;`;

	return json(allEvents);
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
		RETURNING *;
	`;

	try {
		const event = await db.client.unsafe(queryString);

		return json(event[0]);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
