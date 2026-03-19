<script lang="ts">
	let imageCover: string = $state('/images/la_nuit_des_musees.jpg');

	const projects = [
		{
			title: 'Nuit des Musées',
			year: 2024,
			link: '/Project_Page/Pr_NuitDesMusees',
			image: '/images/la_nuit_des_musees.jpg'
		},
		{
			title: 'A.A.L.C.C',
			year: 2025,
			link: '#',
			image: '/images/aalcc.jpg'
		},
		{
			title: 'Série Motion',
			year: 2026,
			link: '#',
			image: '/images/serie_motion.jpg'
		},
		{
			title: 'Château Lagrange',
			year: 2025,
			link: '#',
			image: '/images/chateau_lagrange.jpg'
		},
		{
			title: 'Showreel',
			year: 2024,
			link: '#',
			image: '/images/showreel.jpg'
		},
		{
			title: 'Bacchanight',
			year: 2023,
			link: '#',
			image: '/images/bacchanight.jpg'
		},
		{
			title: 'Valeria',
			year: 2024,
			link: '#',
			image: '/images/valeria.jpg'
		},
		{
			title: 'Sapio Spirits',
			year: 2026,
			link: '#',
			image: '/images/sapio_spirits.jpg'
		},
		{
			title: 'Domaine Giscours',
			year: 2026,
			link: '#',
			image: '/images/domaine_giscours.jpg'
		},
		{
			title: 'La Boîte à Cailloux',
			year: 2024,
			link: '#',
			image: '/images/la_boite_a_cailloux.jpg'
		},
		{
			title: 'Bikers au Grand Coeur',
			year: 2024,
			link: '#',
			image: '/images/bikers_au_grand_coeur.jpg'
		}
	];
</script>

<div class="flex flex-1 h-full min-h-0 flex-col gap-6 overflow-hidden mx-8">
	<div class="flex items-baseline gap-4 sticky pointer-events-none">
		<span class="flex font-metal text-[1.25rem] md:text-[2rem] xl:text-[2.5rem] leading-[85%] uppercase">B.</span>
		<h1 class="flex font-amiri text-[2.5rem] md:text-[4rem] xl:text-[10rem] -mt-6 -mb-9 uppercase">Projets</h1>
		<hr class="flex-1 min-w-px h-px bg-black" />
	</div>

	<div class="w-full max-h-full flex flex-1 min-h-0 justify-between">

		<!-- Section Projects -->
		<div class="w-[100rem] flex flex-1 min-h-0 justify-between max-h-full overflow-auto [&::-webkit-scrollbar]:hidden">

			<!-- Cover -->
			<div class="flex flex-1 min-h-0 h-full flex-col justify-between sticky top-0 pb-8">
				<div class="relative w-[600px] h-[520px] m-auto bg-theme-black">
					<img src={imageCover} alt="" class="absolute inset-0 h-full w-full" />
				</div>
				<div class="flex flex-col gap-4 w-[40vw]">
					<h2 class="font-amiri uppercase leading-[85%] text-[3rem]">Liste de tous mes projets.</h2>
					<p class="font-bricolage-grotesque font-medium leading-[100%] text-[1rem]">
						Voici l'ensemble de mes projets, réalisés en alternance et scolaires. Restez à l'affût, vous pourriez voir de nouveaux projets bientôt !
					</p>
				</div>
			</div>

			<!-- Index -->
			<div class="z-20 flex flex-1 flex-col gap-20 max-h-full relative">
				{#each projects as project, i (i)}
					<a
						onmouseenter={() => (imageCover = project.image)}
						href={project.link}
						data-image={project.image}
						class="w-fit"
					>
						<div class="flex gap-9 items-end text-theme-black opacity-60 w-fit hover:opacity-100">
							<div class="font-bricolage-grotesque uppercase leading-[80%] text-[2rem] flex flex-row justify-end items-end">
								<span>{i > 8 ? i + 1 : '0' + (i + 1)}.</span>
							</div>
							<div class="flex gap-4">
								<div class="flex gap-1 items-start">
									<span class="font-bricolage-grotesque uppercase leading-[80%] text-[1rem]">Titre</span>
									<h3 class="font-bricolage-grotesque uppercase leading-[80%] text-[2rem]">{project.title}</h3>
								</div>
								<div class="flex gap-1 items-start">
									<span class="font-bricolage-grotesque uppercase leading-[80%] text-[1rem]">Année</span>
									<h3 class="font-bricolage-grotesque uppercase leading-[80%] text-[2rem]">{project.year}</h3>
								</div>
							</div>
						</div>
					</a>
				{/each}
				<div class="h-1 shrink-0"></div>
			</div>
		</div>

		<!-- Section Indic -->
		<div class="flex flex-col min-h-0 justify-end mt-auto gap-[20vh] sticky bottom-8">
			<div class="translate-x-[calc(50%-11px)] -rotate-90 flex items-center justify-end gap-4 flex-1 bottom-0">
				<hr class="w-full min-w-[50px] h-[2px] bg-theme-black" />
				<span class="font-bricolage-grotesque uppercase font-medium leading-[110%] text-[1.25rem]">scroll</span>
			</div>
			<h2 class="font-amiri uppercase text-[3rem] -mb-6">Index</h2>
		</div>

	</div>
</div>