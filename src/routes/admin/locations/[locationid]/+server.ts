import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

export async function GET({ params }) {
	const db = await database();
	const locationid: string = params.locationid;

	const queryString = `
		SELECT * FROM locations WHERE id = ${locationid};
	`;

	try {
		const location = await db.client.unsafe(queryString);

		return json(location[0]);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}

export async function PUT({ params, request }) {
	const db = await database();
	const locationid: string = params.locationid;
	const body = await request.json();

	const queryStringParts: string[] = [];
	queryStringParts.push(`UPDATE locations SET`);

	const allowedKeys = ['name', 'address', 'url', 'type'];

	const updateParts = Object.keys(body)
		.filter((key) => allowedKeys.includes(key))
		.map((key) => `${key} = '${body[key]}'`)
		.join(', ');
	queryStringParts.push(updateParts);

	queryStringParts.push(`WHERE id = ${locationid}`);
	queryStringParts.push(`RETURNING *`);

	const queryString = queryStringParts.join(' ');

	try {
		const location = await db.client.unsafe(queryString);

		return json(location[0]);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
