import { error, json } from '@sveltejs/kit';
import database from '$lib/db';

export type ConfigKey =
	| 'location.name'
	| 'location.logo'
	| 'term.title'
	| 'term.batchNumber'
	| 'term.startDate'
	| 'term.firstWeek';

export type Config = {
	key: ConfigKey;
	value: string;
};

export async function GET() {
	const db = await database();

	const dbConfigEntries = await db.client`SELECT * FROM config;`;

	const configEntries: Config[] = dbConfigEntries.map((dbConfigEntry) => ({
		key: dbConfigEntry.key,
		value: dbConfigEntry.value
	}));

	return json(configEntries);
}

export async function PUT({ request }) {
	const db = await database();
	const body = await request.json();

	const allowedKeys = [
		'location.name',
		'location.logo',
		'term.title',
		'term.batchNumber',
		'term.startDate',
		'term.firstWeek'
	];

	const keys = Object.keys(body).filter(allowedKeys.includes);
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
		const dbConfigEntry = await db.client.unsafe(queryString);

		const configEntry: Config = {
			key: dbConfigEntry[0].key,
			value: dbConfigEntry[0].value
		};

		return json(configEntry);
	} catch (e) {
		error(500, {
			message: (e as unknown as Error).message
		});
	}
}
