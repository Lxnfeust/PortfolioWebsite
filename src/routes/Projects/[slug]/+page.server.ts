import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const response = await fetch(`/src/lib/data/projects/${params.slug}.json`);
	console.log('response :', response);
	if (!response.ok) {
		throw new Error('Failed to fetch post');
	}
	return await response.json();
};
