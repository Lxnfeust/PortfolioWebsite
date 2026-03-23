<script lang="ts">
	const projects: Project[] = [
		{
			title: 'Nuit des Musées',
			role: '3D',
			year: '2024',
			domain: 'Interactive exp.',
			images: [
				{
					src: '/images/la_nuit_des_musees.jpg',
					alt: 'Nuit des Musées - Image 1'
				},
				{
					src: '/images/la_nuit_des_musees.jpg',
					alt: 'Nuit des Musées - Image 2'
				}
			],
			link: {
				url: '/projects/nuit-des-musees',
				target: ''
			}
		},
		{
			title: 'AALCC',
			role: 'DA',
			year: '2025',
			domain: 'Website',
			images: [
				{
					src: '/images/aalcc.jpg',
					alt: 'AALCC - Image 1'
				},
				{
					src: '/images/aalcc.jpg',
					alt: 'AALCC - Image 2'
				}
			],
			link: {
				url: '/projects/aalcc',
				target: ''
			}
		},
		{
			title: 'Visual series',
			role: 'Design',
			year: '2025',
			domain: 'Motion design',
			images: [
				{
					src: '/images/serie_motion.jpg',
					alt: 'Serie motion - Image 1'
				},
				{
					src: '/images/serie_motion.jpg',
					alt: 'Serie motion - Image 2'
				}
			],
			link: {
				url: '/projects/serie-motion',
				target: ''
			}
		},
		{
			title: 'Bacchanight',
			role: 'DA',
			year: '2023',
			domain: 'Interactive exp.',
			images: [
				{
					src: '/images/bacchanight.jpg',
					alt: 'Bacchanight - Image 1'
				},
				{
					src: '/images/bacchanight.jpg',
					alt: 'Bacchanight - Image 2'
				}
			],
			link: {
				url: '/projects/bacchanight',
				target: ''
			}
		}
	];

	interface Project {
		title: string;
		role: string;
		year: string;
		domain: string;
		images: {
			src: string;
			alt: string;
		}[];
		link?: {
			url: string;
			target: string;
		};
	}
</script>

{#snippet project(project)}
	{#if project.link}
		<a
			href={project.link.url}
			target={project.link.target}
			class="group relative flex w-full justify-center text-theme-black transition duration-700 hover:bg-theme-black hover:text-theme-white"
		>
			<div class="flex w-90 flex-col gap-8 p-4 md:w-140 xl:w-160">
				<div class="flex justify-between">
					<div class="flex flex-col gap-0 xl:flex-row xl:items-start xl:gap-2">
						<p class="text-xs leading-[105%] uppercase md:text-base xl:mt-1">Title</p>
						<p class="text-xl leading-none font-medium uppercase md:text-2xl xl:text-3.5xl">
							{project.title}
						</p>
					</div>
					<div class="flex flex-col items-end gap-0 xl:flex-row xl:items-start xl:gap-2">
						<p class="text-xs leading-[105%] uppercase md:text-base xl:mt-1">Role</p>
						<p class="text-xl leading-none font-medium uppercase md:text-2xl xl:text-3.5xl">
							{project.role}
						</p>
					</div>
				</div>
				<div class="flex h-30 items-center justify-center gap-6 md:h-50 xl:gap-8">
					<h3
						class="font-amiri text-2xl leading-none font-medium uppercase italic opacity-0 transition duration-700 group-hover:opacity-100 md:text-4.5xl xl:text-6.5xl"
					>
						{project.title}
					</h3>
					<img
						src={project.images[0].src}
						alt={project.images[0].alt}
						class="group absolute left-[calc(50%-80px)] h-30 min-w-30 origin-left -translate-x-1/2 rounded object-cover transition-all duration-700 group-hover:left-4 group-hover:translate-0 group-hover:scale-150 md:left-[calc(50%-130px)] md:h-50 md:min-w-50 xl:h-50 xl:min-w-57.5"
					/>
					<img
						src={project.images[1].src}
						alt={project.images[1].alt}
						class="absolute right-[calc(50%-80px)] h-30 min-w-30 origin-right translate-x-1/2 rounded object-cover transition-all duration-700 group-hover:right-4 group-hover:translate-0 group-hover:scale-150 md:right-[calc(50%-130px)] md:h-50 md:min-w-50 xl:h-50 xl:min-w-57.5"
					/>
				</div>
				<div class="flex justify-between">
					<div class="flex flex-col gap-0 xl:flex-row xl:items-start xl:gap-2">
						<p class="text-xs leading-[105%] uppercase md:text-base xl:mt-1">Année</p>
						<p class="text-xl leading-[105%] font-medium uppercase md:text-2xl xl:text-3.5xl">
							{project.year}
						</p>
					</div>
					<div class="flex flex-col items-end gap-0 xl:flex-row xl:items-start xl:gap-2">
						<p class="text-xs leading-[105%] uppercase md:text-base xl:mt-1">Domaine</p>
						<p class="text-xl leading-[105%] font-medium uppercase md:text-2xl xl:text-3.5xl">
							{project.domain}
						</p>
					</div>
				</div>
			</div>
		</a>
	{:else}
		<div
			class="flex w-full justify-center bg-theme-white text-theme-black transition duration-700 hover:bg-theme-black hover:text-theme-white"
		>
			<div class="group flex w-90 flex-col gap-8 p-4 md:w-140 xl:w-160">
				<div class="flex justify-between">
					<div class="flex flex-col gap-0 xl:flex-row xl:items-start xl:gap-2">
						<p class="text-xs leading-[105%] uppercase md:text-base xl:mt-1">Titre</p>
						<p class="text-xl leading-none font-medium uppercase md:text-2xl xl:text-3.5xl">
							{project.title}
						</p>
					</div>
					<div class="flex flex-col items-end gap-0 xl:flex-row xl:items-start xl:gap-2">
						<p class="text-xs leading-[105%] uppercase md:text-base xl:mt-1">Rôle</p>
						<p class="text-xl leading-none font-medium uppercase md:text-2xl xl:text-3.5xl">
							{project.role}
						</p>
					</div>
				</div>
				<div class="relative flex h-30 items-center justify-center gap-6 md:h-50 xl:gap-8">
					<h3
						class="font-amiri text-2xl leading-none font-medium uppercase italic opacity-0 transition duration-700 group-hover:opacity-100 md:text-[40px] xl:text-[64px]"
					>
						{project.title}
					</h3>
					<img
						src={project.images[0].src}
						alt={project.images[0].alt}
						class="absolute top-0 left-16 h-30 min-w-30 rounded object-cover transition-all duration-700 group-hover:-left-full md:h-50 md:min-w-50 xl:h-50 xl:min-w-57.5"
					/>
					<img
						src={project.images[1].src}
						alt={project.images[1].alt}
						class="absolute top-0 right-16 h-30 min-w-30 rounded object-cover transition-all duration-700 group-hover:right-full md:h-50 md:min-w-50 xl:h-50 xl:min-w-57.5"
					/>
				</div>
				<div class="flex justify-between">
					<div class="flex flex-col gap-0 xl:flex-row xl:items-start xl:gap-2">
						<p class="text-xs leading-[105%] uppercase md:text-base xl:mt-1">Year</p>
						<p class="text-xl leading-[105%] font-medium uppercase md:text-2xl xl:text-3.5xl">
							{project.year}
						</p>
					</div>
					<div class="flex flex-col items-end gap-0 xl:flex-row xl:items-start xl:gap-2">
						<p class="text-xs leading-[105%] uppercase md:text-base xl:mt-1">Domain</p>
						<p class="text-xl leading-[105%] font-medium uppercase md:text-2xl xl:text-3.5xl">
							{project.domain}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
{/snippet}

<div class="container_home px-6 pb-6">
	<div class="flex h-[calc(100lvh-100px)] flex-col justify-between">
		<div class="heading flex items-baseline gap-2 xl:gap-4">
			<span class="flex font-metal text-xl leading-[85%] uppercase md:text-3.5xl xl:text-4.5xl">
				A.
			</span>
			<h1 class="xl:leading-[100%] 2l:leading-[70%] -mb-9 flex font-amiri text-[2.5rem] uppercase md:text-[4rem] xl:text-[8rem] 2xl:text-[10rem]">
				Portfolio
			</h1>
			<hr class="h-px min-w-px flex-1 bg-black" />
		</div>
		<div class="flex flex-col gap-1 md:gap-1 lg:gap-1 xl:gap-1.5">
			<div class="flex justify-between">
				<p class="text-base leading-[105%] uppercase md:text-base lg:text-base xl:text-xl">
					DA Junior
				</p>
				<p class="text-base leading-[105%] uppercase md:text-base lg:text-base xl:text-xl">
					22 ans
				</p>
			</div>
			<div class="flex justify-between">
				<h2
					class="font-amiri text-3.5xl leading-[85%] uppercase italic md:text-5xl xl:text-7.5xl"
				>
					Mattéo
				</h2>
				<h2
					class="font-amiri text-3.5xl leading-[85%] uppercase italic md:text-5xl xl:text-7.5xl"
				>
					Lambert
				</h2>
			</div>
		</div>
		<div class="flex flex-col items-center gap-16 text-center md:gap-16 lg:gap-16 xl:gap-20">
			<div class="flex flex-col gap-2">
				<p class="text-base leading-[105%]">
					Hello ! Bienvenue sur mon portfolio :) <br />
					<a href="/about-me" class="font-semibold">Moi c'est Mattéo.</a>
				</p>
			</div>
			<div class="flex flex-col items-center gap-4">
				<span class="text-base leading-[105%] font-medium uppercase text-[1rem] md:text-xl">Scroll</span>
				<hr class="h-12.5 w-px bg-theme-black" />
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-16">
		<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-0">
			<h2
				class="font-amiri text-3.5xl leading-[85%] uppercase italic md:text-5xl xl:text-7.5xl"
			>
				Projets sélectionnés
			</h2>
			<a href="/projects" class="text-base leading-[105%] font-medium uppercase md:mb-1 text-[1rem] md:text-xl"
				>Voir tous les projets&nbsp;→</a
			>
		</div>
		<div class="flex flex-col items-center gap-12">
			{#each projects as proj, i (i)}
				{@render project(proj)}
			{/each}
		</div>
	</div>
	<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-0">
		<h2
			class="font-amiri text-3.5xl leading-[85%] uppercase italic md:text-5xl xl:text-7.5xl"
		>
			En voir plus&nbsp;?
		</h2>
		<a href="/laboratory" class="text-base leading-[105%] font-medium uppercase md:mb-1 text-[1rem] md:text-xl"
			>Visiter le laboratoire&nbsp;→</a
		>
	</div>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="max-w-60 text-base leading-[105%]">
			Découvrez mes créations spontanées, des projets qui alimentent et font part de mon esprit
			créatif.
		</p>
		<a href="/projects" class="text-base leading-[105%] font-medium uppercase text-[1rem] md:text-xl"
			>Découvrir&nbsp;→</a
		>
	</div>
	<a
		href="#top"
		class="flex justify-center border-y py-4 text-base leading-[105%] font-medium uppercase text-[1rem] md:text-xl"
		>Remonter la page</a
	>
</div>
