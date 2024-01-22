import type { public_event } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('db/events.json');
	const events: public_event[] = await res.json();
	return { events };
};
