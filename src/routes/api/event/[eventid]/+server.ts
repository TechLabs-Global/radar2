import { error, json } from '@sveltejs/kit';
import database from '$lib/db';
import { validateEventId } from '$lib/validators';

export async function GET(e) {
	const db = await database();
	const eventId: string = e.params.eventid;

	if (!validateEventId(eventId)) {
		error(400, {
			message: 'Invalid event ID'
		});
	}

	const event = await db.event(eventId);

	return json(event);
}
