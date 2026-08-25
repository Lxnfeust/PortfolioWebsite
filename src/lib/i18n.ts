export type Lang = 'fr' | 'en';

export const dictionaries = {
	fr: {
		nav: {
			home: 'Accueil',
			projects: 'Projets',
			laboratory: 'Laboratoire',
			aboutMe: 'À propos de moi'
		},
		common: {
			allProjects: 'Tous les projets',
			nextProject: 'Projet suivant',
			scroll: 'Scroll',
			backHome: 'Retour à l’accueil'
		}
	},
	en: {
		nav: {
			home: 'Home',
			projects: 'Projects',
			laboratory: 'Laboratory',
			aboutMe: 'About me'
		},
		common: {
			allProjects: 'All projects',
			nextProject: 'Next project',
			scroll: 'Scroll',
			backHome: 'Back to home'
		}
	}
} as const;

// Petit helper pour ne pas répéter la logique de préfixe partout
export function localizedHref(lang: Lang, path: string): string {
	return path === '/' ? `/${lang}` : `/${lang}${path}`;
}