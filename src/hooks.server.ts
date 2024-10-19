export async function handle({ event, resolve }) {
	const response = await resolve(event);

	if (event.url.pathname.startsWith('/api')) {
		// Apply Cache-Control header for API routes
		response.headers.set('Cache-Control', 'public, max-age=3600, s-max-age=3600');
	} else {
		response.headers.set('Cache-Control', 'public, max-age=86400, s-max-age=86400');
	}

	return response;
}
