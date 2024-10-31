import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

export type Location = {
	id: string;
	name: string;
	address?: string;
	url: string;
	type: string;
};

export async function GET() {
	const db = await database();

	const dbLocations = await db.client`SELECT id, name, address, url, type FROM locations;`;

	const locations: Location[] = dbLocations.map((dbLocation) => ({
		id: dbLocation.id,
		name: dbLocation.name,
		address: dbLocation.address,
		url: dbLocation.url,
		type: dbLocation.type
	}));

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
        RETURNING id, name, address, url, type;
    `;

	try {
		const dbLocation = await db.client.unsafe(queryString);

		const location: Location = {
			id: dbLocation[0].id,
			name: dbLocation[0].name,
			address: dbLocation[0].address,
			url: dbLocation[0].url,
			type: dbLocation[0].type
		};

		return json(location);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
