import { json } from "@sveltejs/kit";
import fs from "fs/promises";
import { access } from "fs/promises";
import path from "path";
import toml from "toml";
import dayjs from "dayjs";
import ics from "ics";
import type { Event, Location } from "$lib/types/event";
import { error } from "console";

export async function GET(e) {
	// const eventId = e.params.eventid;

	// if (!validateEventId(eventId)) {
	//     return json({ error: "Invalid event ID" }, { status: 400 });
	// }

	// try {
	//     const eventsDir = path.resolve("./src/lib/server/content/events");
	//     const eventFile = path.resolve(eventsDir, `${eventId}.toml`);

	//     try {
	//         await access(eventFile);
	//     } catch (error) {
	//         return json({ error: "Event not found" }, { status: 404 });
	//     }

	//     const content = await fs.readFile(eventFile, "utf-8");
	//     let event = toml.parse(content) as Event;
	//     event.id = eventId;

	//     try {
	//         const ics = generateICS(event);

	//         return new Response(ics as string, {
	//             status: 200,
	//             headers: {
	//                 "Content-Type": "text/calendar",
	//                 "Content-Disposition": `attachment; filename="${eventId}.ics"`
	//             },
	//         });
	//     } catch (error) {
	//         return json({ error: "Error generating ICS file" }, { status: 500 });
	//     }
	// } catch (error) {
	//     console.error("Error reading events", error);

	//     return json({ error: "Internal server error" }, { status: 500 });
	// }

	error(501, {
		message: "Not implemented"
	});
}

function validateEventId(eventId: string): boolean {
	return /^[0-9]+_[a-z0-9-_]+$/.test(eventId);
}

function generateICS(event: Event): string {
	const location = event.location;
	const start = dayjs(event.date);
	const duration = 2; // TODO make this configurable

	const icsEvent = {
		start: [start.year(), start.month() + 1, start.date(), start.hour(), start.minute()],
		duration: { hours: duration },
		title: event.title,
		description: event.description,
		location: location.address,
		organizer: { name: "TechLabs Düsseldorf e. V.", email: "duesseldorf@techlabs.org" } // TODO make this configurable using the location from config
	};

	let icsString = "";

	ics.createEvent(icsEvent, (error, value) => {
		if (error) {
			throw error;
		}

		icsString = value;
	});

	return icsString;
}
