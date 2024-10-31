import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

export async function GET() {
	const db = await database();

	const locations = await db.client`SELECT * FROM locations;`;

	return json(locations);
}

export async function POST({ request }) {
	const db = await database();
	const body = await request.json();

	const requiredFields = ['name', 'url', 'type'];

	requiredFields.forEach((field) => {
		if (!body[field]) {
			error(400, {
				message: `Missing required field ${field}`
			});
		}
	});

	if (body.type === 'offline' && !body.address) {
		error(400, {
			message: `Missing required field address when adding offline location`
		});
	}

	const fields = requiredFields;
	const values = fields.map((field) => `'${body[field]}'`);

	const queryString = `
        INSERT INTO locations (${fields.join(', ')})
        VALUES (${values.join(', ')})
        RETURNING *;
    `;

	try {
		const location = await db.client.unsafe(queryString);

		return json(location);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
