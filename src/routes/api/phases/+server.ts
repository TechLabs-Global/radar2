import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Phase } from '$lib/types/phase.ts';
import sql from '$lib/db';

export async function GET(e) {
    try {
        const phases = await sql<Phase[]>`
            SELECT * FROM phases
            ORDER BY date_from ASC
        `;

        if (!phases) {
            error(404, {
                message: "Phases not found",
            });
        }
    
        return json(phases);
    } catch (e) {
        console.error("Error reading phases", e);

        error(500, {
            message: "Internal server error",
        });
    }
}
