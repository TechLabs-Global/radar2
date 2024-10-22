import { error } from "console";

export async function GET() {
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
