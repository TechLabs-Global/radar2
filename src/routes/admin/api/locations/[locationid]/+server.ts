import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

import { validateLocationId } from '$lib/validators';
import type { Location } from '../+server';

export async function GET({ params }) {
	const db = await database();
	const locationid: string = params.locationid;

	const queryString = `
		SELECT id, name, address, url, type FROM locations WHERE id = ${locationid};
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

export async function PUT({ params, request }) {
	const db = await database();
	const locationid: string = params.locationid;

	if (!validateLocationId(locationid)) {
		error(400, {
			message: 'Invalid location ID'
		});
	}

	const body = await request.json();

	const allowedKeys = ['name', 'address', 'url', 'type'];

	const updateParts = Object.keys(body)
		.filter(allowedKeys.includes)
		.map((key) => `${key} = '${body[key]}'`)
		.join(', ');

	const queryString = `
		UPDATE locations SET
		${updateParts}
		WHERE id = ${locationid}
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

export async function DELETE({ params }) {
	const db = await database();
	const locationid: string = params.locationid;

	if (!validateLocationId(locationid)) {
		error(400, {
			message: 'Invalid location ID'
		});
	}

	try {
		const { count: deletedEntries } =
			await db.client`DELETE FROM locations WHERE id = ${locationid};`;

		return json({ locationId: locationid, deletedEntries });
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
