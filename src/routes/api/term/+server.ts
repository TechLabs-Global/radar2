import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { access } from 'fs/promises';
import path from 'path';
import toml from 'toml';
import { Term } from '$lib/types/term';
import sql, { DB } from '$lib/db';
import type { ConfigItem } from '$lib/types/config';

export async function GET(e) {
    const term = await DB.term();

    return json(term);
}
