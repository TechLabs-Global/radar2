import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Term } from '$lib/types/term.js';

export async function GET(e) {
    try {
        const termFile = path.resolve("./src/lib/server/content/term.toml");

        try {
            await access(termFile);
        } catch (error) {
            return json({ error: "Term configuration not found" }, { status: 404 });
        }

        const content = await fs.readFile(termFile, "utf-8");
        const term = toml.parse(content) as Term;

        return json(term);
    } catch (error) {
        console.error("Error reading term", error);
        
        return json({ error: "Internal server error" }, { status: 500 });
    }
}
