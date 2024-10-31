import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

export async function GET() {
	const db = await database();

	const allEvents = await db.client`SELECT * FROM config;`;

	return json(allEvents);
}

export async function PUT({ request }) {
	const db = await database();
	const body = await request.json();

	const allowedKeys = [
		'location.logo',
		'term.batchNumber',
		'term.startDate',
		'term.firstWeek',
		'location.name',
		'term.title'
	];

	const keys = Object.keys(body).filter((key) => allowedKeys.includes(key));
	const values = keys.map((key) => body[key]);

	if (keys.length !== values.length) {
		error(400, {
			message: 'Invalid request body'
		});
	}

	const queryString = `
		INSERT INTO config (key, value)
		VALUES ${keys.map((key, index) => `('${key}', '${values[index]}')`).join(', ')}
		ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
		RETURNING *;
	`;

	try {
		const event = await db.client.unsafe(queryString);

		return json(event);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
