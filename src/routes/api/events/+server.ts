import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import path from 'path';
import toml from 'toml';
import { Event, type Location } from '$lib/types/event';
import sql from '$lib/db';

export async function GET() {
    Event.all().then((events) => {
        return json(events);
    })
}
