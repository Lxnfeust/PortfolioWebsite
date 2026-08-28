import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import { localizeProject } from '$lib/i18n';

export const load: PageServerLoad = async ({ params }) => {
	const project = Object.values(projects).find((p) => p.slug === params.slug);

	if (!project) {
		error(404, 'Projet introuvable');
	}

	return localizeProject(project, params.lang as 'fr' | 'en');
};
