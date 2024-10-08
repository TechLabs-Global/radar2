import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Phase } from '$lib/types/phase.ts';

export async function GET(e) {
    try {
        const phasesFile = path.resolve("./src/lib/server/content/phases.toml");

        try {
            await access(phasesFile);
        } catch (error) {
            return json({ error: "Phases configuration not found" }, { status: 404 });
        }

        const content = await fs.readFile(phasesFile, "utf-8");
        const phases = toml.parse(content) as Phase[];

        return json(phases.phases);
    } catch (error) {
        console.error("Error reading phases", error);
        
        return json({ error: "Internal server error" }, { status: 500 });
    }
}
