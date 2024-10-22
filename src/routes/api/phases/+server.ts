import { json } from "@sveltejs/kit";
import database from "$lib/db";

export async function GET() {
	const db = await database();
	const phases = await db.phases();

	return json(phases);
}
