import { json } from "@sveltejs/kit";
import database from "$lib/db";

export async function GET() {
	const db = await database();
	const events = await db.events();

	return json(events);
}
