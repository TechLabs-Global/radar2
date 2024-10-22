import { error, json } from "@sveltejs/kit";
import database from "$lib/db";

export async function GET(e) {
	const db = await database();
	const eventId: string = e.params.eventid;

	if (!validateEventId(eventId)) {
		error(400, {
			message: "Invalid event ID"
		});
	}

	const event = await db.event(eventId);

	return json(event);
}

// Check if the event ID is a UUID
function validateEventId(eventId: string): boolean {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
		eventId
	);
}
