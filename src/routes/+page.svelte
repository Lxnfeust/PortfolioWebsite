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
				url: '/projects/la-nuit-des-musees',
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
					alt: 'Nuit des Musées - Image 1'
				},
				{
					src: '/images/aalcc.jpg',
					alt: 'Nuit des Musées - Image 2'
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
					alt: 'Nuit des Musées - Image 1'
				},
				{
					src: '/images/serie_motion.jpg',
					alt: 'Nuit des Musées - Image 2'
				}
			],
			link: {
				url: '/projects/visual-series',
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
					alt: 'Nuit des Musées - Image 1'
				},
				{
					src: '/images/bacchanight.jpg',
					alt: 'Nuit des Musées - Image 2'
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
			<div class="flex w-90 md:w-140 xl:w-160 flex-col gap-8 p-4">

				<!-- Title & Role -->
				<div class="flex justify-between">
					<!-- Title -->
					<div class="flex xl:items-start gap-0 xl:gap-2 flex-col xl:flex-row">
						<p class="text-[12px] md:text-[16px] leading-[105%] uppercase xl:mt-1">Title</p>
						<p class="text-[20px] md:text-[24px] xl:text-[32px] leading-none font-medium uppercase">{project.title}</p>
					</div>
					<!-- Role -->
					<div class="flex xl:items-start gap-0 xl:gap-2 flex-col items-end xl:flex-row">
						<p class="text-[12px] md:text-[16px] leading-[105%] uppercase xl:mt-1">Role</p>
						<p class="text-[20px] md:text-[24px] xl:text-[32px] leading-none font-medium uppercase">{project.role}</p>
					</div>
				</div>

				<!-- Images -->
				<div class="flex h-30 md:h-50 items-center justify-center gap-6 xl:gap-8">
					<h3 class="font-amiri text-[24px] md:text-[40px] xl:text-[64px] leading-none font-medium uppercase italic opacity-0 transition duration-700 group-hover:opacity-100">
						{project.title}
					</h3>
					<img
						src={project.images[0].src}
						alt={project.images[0].alt}
						class="group absolute left-[calc(50%-80px)] md:left-[calc(50%-130px)] h-30 md:h-50 xl:h-50 min-w-30 md:min-w-50 xl:min-w-57.5 origin-left -translate-x-1/2 rounded object-cover transition-all duration-700 group-hover:left-4 group-hover:translate-0 group-hover:scale-150"
					/>
					<img
						src={project.images[1].src}
						alt={project.images[1].alt}
						class="absolute right-[calc(50%-80px)] md:right-[calc(50%-130px)] h-30 md:h-50 xl:h-50 min-w-30 md:min-w-50 xl:min-w-57.5 origin-right translate-x-1/2 rounded object-cover transition-all duration-700 group-hover:right-4 group-hover:translate-0 group-hover:scale-150"
					/>
				</div>

				<!-- Year & Domain -->
				<div class="flex justify-between">
					<!-- Year -->
					<div class="flex xl:items-start gap-0 xl:gap-2 flex-col xl:flex-row">
						<p class="text-[12px] md:text-[16px] leading-[105%] uppercase xl:mt-1">Year</p>
						<p class="text-[20px] md:text-[24px] xl:text-[32px] leading-[105%] font-medium uppercase">{project.year}</p>
					</div>
					<!-- Domain -->
					<div class="flex xl:items-start gap-0 xl:gap-2 flex-col items-end xl:flex-row">
						<p class="text-[12px] md:text-[16px] leading-[105%] uppercase xl:mt-1">Domain</p>
						<p class="text-[20px] md:text-[24px] xl:text-[32px] leading-[105%] font-medium uppercase">{project.domain}</p>
					</div>
				</div>

			</div>
		</a>
	{:else}
		<div class="flex w-full justify-center bg-theme-white text-theme-black transition duration-700 hover:bg-theme-black hover:text-theme-white">
			<div class="group flex w-90 md:w-140 xl:w-160 flex-col gap-8 p-4">

				<!-- Title & Role -->
				<div class="flex justify-between">
					<!-- Title -->
					<div class="flex xl:items-start gap-0 xl:gap-2 flex-col xl:flex-row">
						<p class="text-[12px] md:text-[16px] leading-[105%] uppercase xl:mt-1">Title</p>
						<p class="text-[20px] md:text-[24px] xl:text-[32px] leading-none font-medium uppercase">{project.title}</p>
					</div>
					<!-- Role -->
					<div class="flex xl:items-start gap-0 xl:gap-2 flex-col items-end xl:flex-row">
						<p class="text-[12px] md:text-[16px] leading-[105%] uppercase xl:mt-1">Role</p>
						<p class="text-[20px] md:text-[24px] xl:text-[32px] leading-none font-medium uppercase">{project.role}</p>
					</div>
				</div>

				<!-- Images -->
				<div class="relative flex h-30 md:h-50 items-center justify-center gap-6 xl:gap-8">
					<h3 class="font-amiri text-[24px] md:text-[40px] xl:text-[64px] leading-none font-medium uppercase italic opacity-0 transition duration-700 group-hover:opacity-100">
						{project.title}
					</h3>
					<img
						src={project.images[0].src}
						alt={project.images[0].alt}
						class="absolute top-0 left-16 h-30 md:h-50 xl:h-50 min-w-30 md:min-w-50 xl:min-w-57.5 rounded object-cover transition-all duration-700 group-hover:-left-full"
					/>
					<img
						src={project.images[1].src}
						alt={project.images[1].alt}
						class="absolute top-0 right-16 h-30 md:h-50 xl:h-50 min-w-30 md:min-w-50 xl:min-w-57.5 rounded object-cover transition-all duration-700 group-hover:right-full"
					/>
				</div>

				<!-- Year & Domain -->
				<div class="flex justify-between">
					<!-- Year -->
					<div class="flex xl:items-start gap-0 xl:gap-2 flex-col xl:flex-row">
						<p class="text-[12px] md:text-[16px] leading-[105%] uppercase xl:mt-1">Year</p>
						<p class="text-[20px] md:text-[24px] xl:text-[32px] leading-[105%] font-medium uppercase">{project.year}</p>
					</div>
					<!-- Domain -->
					<div class="flex xl:items-start gap-0 xl:gap-2 flex-col items-end xl:flex-row">
						<p class="text-[12px] md:text-[16px] leading-[105%] uppercase xl:mt-1">Domain</p>
						<p class="text-[20px] md:text-[24px] xl:text-[32px] leading-[105%] font-medium uppercase">{project.domain}</p>
					</div>
				</div>

			</div>
		</div>
	{/if}
{/snippet}

<div class="container_home px-6 pb-6">
	<div class="flex h-[calc(100lvh-100px)] flex-col justify-between">
		<div class="heading">
			<span class="flex font-metal text-[1.25rem] md:text-[2rem] lg:text-[2rem] xl:text-[2.5rem] leading-[85%] uppercase">A.</span>
			<h1 class="flex font-amiri text-[2.5rem] md:text-[4rem] lg:text-[4rem] xl:text-[10rem] -mt-6 -mb-9 uppercase">Portfolio</h1>
			<hr class="flex-1 min-w-px h-px bg-black" />
		</div>
		<div class="flex flex-col gap-1 md:gap-1 lg:gap-1 xl:gap-1.5">
			<div class="flex justify-between">
				<p class="leading-[105%] text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.25rem] uppercase">DA Junior</p>
				<p class="leading-[105%] text-[1rem] md:text-[1rem] lg:text-[1rem] xl:text-[1.25rem] uppercase">22 ans</p>
			</div>
			<div class="flex justify-between">
				<h2 class="font-amiri text-[2rem] md:text-[3rem] lg:text-[3rem] xl:text-[5rem] leading-[85%] uppercase italic">Mattéo</h2>
				<h2 class="font-amiri text-[2rem] md:text-[3rem] lg:text-[3rem] xl:text-[5rem] leading-[85%] uppercase italic">Lambert</h2>
			</div>
		</div>
		<div class="flex flex-col items-center gap-16 md:gap-16 lg:gap-16 xl:gap-20 text-center">
			<div class="flex flex-col gap-2">
				<p class="leading-[105%] text-[1rem]">Hello ! Bienvenue sur mon portfolio :) <br> <a href="/about-me" class="font-semibold">Moi c'est Mattéo.</a></p>
			</div>
			<div class="flex flex-col items-center gap-4">
				<span class="leading-[105%] text-[1rem] md:text-[1.25rem] lg:text-[1.25rem] xl:text-[1.25rem] font-medium uppercase">Scroll</span>
				<hr class="h-12.5 w-px bg-theme-black" />
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-16">
		<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-0">
			<h2 class="font-amiri text-[2rem] md:text-[3rem] lg:text-[3rem] xl:text-[5rem] leading-[85%] uppercase italic">Projets sélectionnés</h2>
			<a href="/projects" class="leading-[105%] text-[1rem] md:text-[1.25rem] lg:text-[1.25rem] xl:text-[1.25rem] md:mb-1 font-medium uppercase">Voir tous les projets&nbsp;→</a>
		</div>
		<div class="flex flex-col items-center gap-12">
			{#each projects as proj, i (i)}
				{@render project(proj)}
			{/each}
		</div>
	</div>
	<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-0">
		<h2 class="font-amiri text-[2rem] md:text-[3rem] lg:text-[3rem] xl:text-[5rem] leading-[85%] uppercase italic">En voir plus&nbsp;?</h2>
		<a href="/laboratory" class="leading-[105%] text-[1rem] md:text-[1.25rem] lg:text-[1.25rem] xl:text-[1.25rem] md:mb-1 font-medium uppercase">Visiter le laboratoire&nbsp;→</a>
	</div>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="max-w-60 leading-[105%] text-[1rem]">
			Découvrez mes créations spontanées, des projets qui alimentent et font part de mon esprit créatif.
		</p>
		<a href="/projects" class="leading-[105%] text-[1rem] md:text-[1.25rem] lg:text-[1.25rem] xl:text-[1.25rem] font-medium uppercase">Découvrir&nbsp;→</a>
	</div>
	<a href="#top" class="flex justify-center border-y py-4 leading-[105%] text-[1rem] md:text-[1.25rem] lg:text-[1.25rem] xl:text-[1.25rem] font-medium uppercase">Remonter la page</a>

</div>
