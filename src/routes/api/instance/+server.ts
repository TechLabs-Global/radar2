import { json } from '@sveltejs/kit';
import database from '$lib/db';

/**
 * Returns data relevant for showing the Radar instance. This includes data on the instance's
 * TechLabs location and the term currently displayed.
 */
export async function GET() {
	const db = await database();
	const location = await db.location();
	const term = await db.term();

	return json({
		location: location,
		term: term,
	});
}
