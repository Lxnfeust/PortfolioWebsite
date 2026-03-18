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
			]
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
			]
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
			]
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
			]
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
	}
</script>

<div class="container_home px-6 pb-6">
	<div class="flex h-[calc(100lvh-100px)] flex-col justify-between">
		<div class="heading">
			<span>A.</span>
			<h1>Portfolio</h1>
			<hr />
		</div>
		<div>
			<div class="flex justify-between">
				<p class="leading-[105%] uppercase">DA Junior</p>
				<p class="leading-[105%] uppercase">22 ans</p>
			</div>
			<div class="flex justify-between">
				<p class="font-amiri text-5xl leading-[85%] uppercase italic">Mattéo</p>
				<p class="font-amiri text-5xl leading-[85%] uppercase italic">Lambert</p>
			</div>
		</div>
		<div class="flex flex-col items-center gap-16 text-center">
			<div class="flex flex-col gap-2">
				<p class="leading-[105%]">Hello ! Bienvenue sur mon portfolio :)</p>
				<p class="leading-[105%] font-semibold">Moi c'est Mattéo.</p>
			</div>
			<div class="flex flex-col items-center gap-4">
				<span class="text-xl leading-[105%] font-medium uppercase">Scroll</span>
				<hr class="h-12.5 w-px bg-theme-black" />
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-16">
		<div class="flex flex-col items-end justify-between md:flex-row">
			<p class="font-amiri text-5xl leading-[85%] uppercase italic">Projets <br /> sélectionnés</p>
			<a href="/projects" class="text-xl leading-[105%] font-medium uppercase"
				>Voir tous les projets →</a
			>
		</div>
		<div class="flex flex-col gap-12 px-25">
			{#each projects as project, i (i)}
				<div class="flex flex-col gap-8 p-4">
					<div>
						<div class="flex justify-between">
							<p class="leading-[105%] uppercase">Title</p>
							<p class="leading-[105%] uppercase">Role</p>
						</div>
						<div class="flex justify-between">
							<p class="text-xl leading-none font-medium uppercase">{project.title}</p>
							<p class="text-xl leading-none font-medium uppercase">{project.role}</p>
						</div>
					</div>
					<div class="flex justify-center gap-6">
						<img
							src={project.images[0].src}
							alt={project.images[0].alt}
							class="h-50 max-w-57.5 min-w-57.5 rounded object-cover"
						/>
						<img
							src={project.images[1].src}
							alt={project.images[1].alt}
							class="h-50 max-w-57.5 min-w-57.5 rounded object-cover"
						/>
					</div>
					<div>
						<div class="flex justify-between">
							<p class="leading-[105%] uppercase">Year</p>
							<p class="leading-[105%] uppercase">Domain</p>
						</div>
						<div class="flex justify-between">
							<p class="text-2xl leading-[105%] font-medium uppercase">{project.year}</p>
							<p class="text-2xl leading-[105%] font-medium uppercase">{project.domain}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-col items-end justify-between md:flex-row">
		<p class="font-amiri text-5xl leading-[85%] uppercase italic">En voir plus ?</p>
		<a href="/laboratory" class="text-xl leading-[105%] font-medium uppercase"
			>Visiter le laboratoire →</a
		>
	</div>
	<div class="flex flex-col items-center gap-6 text-center">
		<p class="max-w-60 leading-[105%]">
			Découvrez mes créations spontanées, des projets qui alimentent et font part de mon esprit
			créatif.
		</p>
		<a href="/projects" class="text-xl leading-[105%] font-medium uppercase">Découvrir →</a>
	</div>
	<a href="#" class="flex justify-center border-y py-4 text-xl leading-[105%] font-medium uppercase"
		>Remonter la page</a
	>
	<!-- <div class="Section_selectedprojects">
        <h2>Selected Projects</h2>
        <div class="selectedprojects">

            <div class="sp_card">
                <div class="sp_card_Line">
                    <div class="sp_card_Item">
                        <span>Title</span>
                        <p>Nuit des Musées</p>
                    </div>
                    <div class="sp_card_Item">
                        <span>Rôle</span>
                        <p>3D</p>
                    </div>
                </div>
                <div class="sp_card_ProjectName">
                    <span>Nuit des Musées</span>
                </div>
                <div class="sp_card_Line">
                    <div class="sp_card_Item">
                        <span>Title</span>
                        <p>2024</p>
                    </div>
                    <div class="sp_card_Item">
                        <span>Domaine</span>
                        <p>Exp. Interactive</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="Section_seemore">
        <h2>Want to see more?</h2>
        <div class="seemore_items">
            <span><a href="/projects">All Works</a></span>
            <span>About Me</span>
            <span>Playground</span>
        </div>
    </div> -->
</div>
