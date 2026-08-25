import type { LayoutLoad } from './$types';
import { dictionaries, type Lang } from '$lib/i18n';

export const load: LayoutLoad = ({ params }) => {
	const lang = params.lang as Lang;
	return {
		lang,
		t: dictionaries[lang]
	};
};