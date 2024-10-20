import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import type { Phase } from '$lib/types/phase.ts';
import sql, { DB } from '$lib/db';

export async function GET(e) {
    const phases = await DB.phases();

    return json(phases);
}
