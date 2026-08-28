export type Lang = 'fr' | 'en';

export const dictionaries = {
	fr: {
		nav: {
			home: 'Accueil',
			projects: 'Projets',
			laboratory: 'Playground',
			aboutMe: 'À propos de moi'
		},
		common: {
			allProjects: 'Tous les projets',
			nextProject: 'Projet suivant',
			scroll: 'Scroll',
			backHome: 'Retour à l’accueil'
		},
		home: {
			heroTitle: 'Designer & DA Junior',
			heroLine1: 'Bonjour et bienvenue sur mon portfolio, moi c’est Mattéo.',
			heroLine2:
				'Designer 360, en éternelle quête de renouvellement de mes moyens d’expression créatifs.',
			featuredTitle: 'Projets sélectionnés',
			labelTitle: 'Titre',
			labelYear: 'Année',
			viewProject: 'Voir',
			prevProject: 'Projet précédent',
			nextProjectArrow: 'Projet suivant',
			labSectionTitle: 'En voir plus\u00a0?',
			labText: 'Créations spontanées & expérimentations',
			labDragHint: 'Glissez pour explorer',
			backToTop: 'Remonter la page'
		},
		about: {
			helloTitle: 'Hello\u00a0!',
			helloParagraph1:
				"Moi c'est Mattéo et j’ai 22 ans. Je suis un designer pluridisciplinaire en quête de nouveaux moyens et techniques pour exprimer ma créativité. à travers le graphisme, le webdesign, la 3D, ou le motion design, je conçois des projets à l’allure d’expériences.",
			helloParagraph2:
				'Je suis convaincu que l’essence même de la création réside dans son processus et qu’il faut traiter chaque étape avec le respect et le soin qu’elle mérite.',
			downloadCv: 'Télécharger mon CV',
			libraryTitle: "Bibliothèque d'inspirations",
			libraryText:
				"Ces livres se trouvent aujourd'hui dans ma bibliothèque et ont grandement contribué à m'inspirer visuellement au fil des années.",
			bookCategories: {
				design3d: 'Design 3D',
				brandingDesign: 'Design & Branding',
				artHistory: "Histoire de l'art",
				artbook: 'Artbook/Illustration',
				motionDesign: 'Motion Design'
			}
		},
		laboratory: {
			explore: 'Explorez',
			prev: '←\u00a0précédent',
			next: 'suivant\u00a0→'
		},
		menu: {
			close: 'Fermer',
			mail: 'Mail',
			cv: 'CV',
			bioParagraph1:
				"Designer pluridisciplinaire actuellement basé à Bordeaux. Tout ce que vous trouverez sur ce site provient d'un esprit un peu trop amusé à l'idée de pouvoir créer ce qu'il veut sur des logiciels et qui a décidé d'en faire sa vocation.",
			bioParagraph2: 'Et si on en discutait\u00a0?'
		},
		projectPage: {
			seeMore: 'Voir Plus\u00a0:'
		}
	},
	en: {
		nav: {
			home: 'Home',
			projects: 'Projects',
			laboratory: 'Playground',
			aboutMe: 'About me'
		},
		common: {
			allProjects: 'All projects',
			nextProject: 'Next project',
			scroll: 'Scroll',
			backHome: 'Back to home'
		},
		home: {
			heroTitle: 'Designer & Junior AD',
			heroLine1: "Hello and welcome to my portfolio, I'm Mattéo.",
			heroLine2: '360° designer, forever seeking to renew my creative means of expression.',
			featuredTitle: 'Selected projects',
			labelTitle: 'Title',
			labelYear: 'Year',
			viewProject: 'View',
			prevProject: 'Previous project',
			nextProjectArrow: 'Next project',
			labSectionTitle: 'Want to see more?',
			labText: 'Spontaneous creations & experiments',
			labDragHint: 'Drag to explore',
			backToTop: 'Back to top'
		},
		about: {
			helloTitle: 'Hello!',
			helloParagraph1:
				"I'm Mattéo, 22 years old. I'm a multidisciplinary designer always looking for new ways and techniques to express my creativity. Through graphic design, web design, 3D, or motion design, I create projects that feel like experiences.",
			helloParagraph2:
				'I believe the very essence of creation lies in its process, and that every step deserves to be treated with the respect and care it deserves.',
			downloadCv: 'Download my CV',
			libraryTitle: 'Library of inspirations',
			libraryText:
				'These books are currently on my shelves and have played a big part in shaping my visual inspiration over the years.',
			bookCategories: {
				design3d: '3D Design',
				brandingDesign: 'Design & Branding',
				artHistory: 'Art history',
				artbook: 'Artbook/Illustration',
				motionDesign: 'Motion Design'
			}
		},
		laboratory: {
			explore: 'Explore',
			prev: '←\u00a0previous',
			next: 'next\u00a0→'
		},
		menu: {
			close: 'Close',
			mail: 'Mail',
			cv: 'CV',
			bioParagraph1:
				"Multidisciplinary designer currently based in Bordeaux. Everything you'll find on this site comes from a mind a little too amused by the idea of creating whatever it wants with software, who decided to make it a career.",
			bioParagraph2: 'How about we talk about it?'
		},
		projectPage: {
			seeMore: 'See more:'
		}
	}
} as const;

// Petit helper pour ne pas répéter la logique de préfixe partout
export function localizedHref(lang: Lang, path: string): string {
	return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

export type LocalizedString = { fr: string; en: string };

function pick(value: LocalizedString | string, lang: Lang): string {
	return typeof value === 'string' ? value : value[lang];
}

export function localizeProject(project: any, lang: Lang) {
	return {
		...project,
		name: pick(project.name, lang),
		title: pick(project.title, lang),
		description: pick(project.description, lang),
		presentation_image: {
			src: project.presentation_image.src,
			alt: pick(project.presentation_image.alt, lang)
		},
		project_infos: {
			title: pick(project.project_infos.title, lang),
			description: pick(project.project_infos.description, lang),
			links: project.project_infos.links.map((link: any) => ({
				...link,
				text: pick(link.text, lang)
			}))
		},
		poster: project.poster
			? {
					src: project.poster.src,
					alt: project.poster.alt ? pick(project.poster.alt, lang) : ''
				}
			: undefined,
		images: project.images.map((img: any) => ({
			src: img.src,
			alt: pick(img.alt, lang)
		}))
	};
}