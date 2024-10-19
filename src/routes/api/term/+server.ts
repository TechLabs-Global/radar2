import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import { Term } from '$lib/types/term';
import sql from '$lib/db';
import type { ConfigItem } from '$lib/types/config';

export async function GET(e) {
    try {
        const rawConfig = await sql<ConfigItem[]>`
            SELECT * FROM config
            WHERE key LIKE 'term.%'
        `;

        if (!rawConfig) {
            error(404, {
                message: "Config not found",
            });
        }

        let term = new Term();

        rawConfig.forEach(({key, value}) => {
            switch (key) {
                case "term.title":
                    term.title = value;
                    break;
                case "term.batchNumber":
                    term.batchNumber = parseInt(value);
                    break;
                case "term.startDate":
                    term.startDate = new Date(value);
                    break;
                case "term.firstWeek":
                    term.firstWeek = parseInt(value);
                    break;
            }
        });

        if (!term.title || term.batchNumber === undefined || !term.startDate || term.firstWeek === undefined) {
            error(404, {
                message: "Term not found",
            });
        }
    
        return json(term);
    } catch (e) {
        console.error("Error reading term config", e);

        error(500, {
            message: "Internal server error",
        });
    }
}
