<script lang="ts">
	let imageCover: string = $state('/images/la_nuit_des_musees.jpg');

	const projects = [
		{
			title: 'Nuit des Musées',
			year: 2024,
			link: '/projects/nuit-des-musees',
			image: '/images/nuit_des_musees.jpg'
		},
		{
			title: 'A.A.L.C.C',
			year: 2025,
			link: '/projects/aalcc',
			image: '/images/aalcc.jpg'
		},
		{
			title: 'Série Motion',
			year: 2026,
			link: '/projects/serie-motion',
			image: '/images/serie_motion.jpg'
		},
		{
			title: 'Château Lagrange',
			year: 2025,
			link: '/projects/chateau-lagrange',
			image: '/images/chateau_lagrange.jpg'
		},
		{
			title: 'Showreel',
			year: 2024,
			link: '/projects/showreel',
			image: '/images/showreel.jpg'
		},
		{
			title: 'Bacchanight',
			year: 2023,
			link: '/projects/bacchanight',
			image: '/images/bacchanight.jpg'
		},
		{
			title: 'Valeria',
			year: 2024,
			link: '/projects/valeria',
			image: '/images/valeria.jpg'
		},
		{
			title: 'Sapio Spirits',
			year: 2026,
			link: '/projects/sapio-spirits',
			image: '/images/sapio_spirits.jpg'
		},
		{
			title: 'Domaine Giscours',
			year: 2026,
			link: '/projects/domaine-giscours',
			image: '/images/domaine_giscours.jpg'
		},
		{
			title: 'La Boîte à Cailloux',
			year: 2024,
			link: '/projects/la-boite-a-cailloux',
			image: '/images/la_boite_a_cailloux.jpg'
		},
		{
			title: 'Bikers au Grand Coeur',
			year: 2024,
			link: '/projects/bikers-au-grand-coeur',
			image: '/images/bikers_au_grand_coeur.jpg'
		}
	];
</script>

<div class="mx-8 flex h-full min-h-0 flex-1 flex-col gap-6 overflow-hidden">
	<div class="pointer-events-none sticky flex items-baseline gap-4">
		<span
			class="flex font-metal text-[1.25rem] leading-[85%] uppercase md:text-[2rem] xl:text-[2.5rem]"
			>B.</span
		>
		<h1 class="-mt-6 -mb-9 flex font-amiri text-[2.5rem] uppercase md:text-[4rem] xl:text-[10rem]">
			Projets
		</h1>
		<hr class="h-px min-w-px flex-1 bg-black" />
	</div>

	<div class="flex max-h-full min-h-0 w-full flex-1 justify-between">
		<!-- Section Projects -->
		<div
			class="flex max-h-full min-h-0 w-[100rem] flex-1 justify-between overflow-auto [&::-webkit-scrollbar]:hidden"
		>
			<!-- Cover -->
			<div class="sticky top-0 flex h-full min-h-0 flex-1 flex-col justify-between pb-8">
				<div class="relative m-auto h-[520px] w-[600px] bg-theme-black">
					<img src={imageCover} alt="" class="absolute inset-0 h-full w-full" />
				</div>
				<div class="flex w-[40vw] flex-col gap-4">
					<h2 class="font-amiri text-[3rem] leading-[85%] uppercase">Liste de tous mes projets.</h2>
					<p class="font-bricolage-grotesque text-[1rem] leading-[100%] font-medium">
						Voici l'ensemble de mes projets, réalisés en alternance et scolaires. Restez à l'affût,
						vous pourriez voir de nouveaux projets bientôt !
					</p>
				</div>
			</div>

			<!-- Index -->
			<div class="relative z-20 flex max-h-full flex-1 flex-col gap-20">
				{#each projects as project, i (i)}
					<a
						onmouseenter={() => (imageCover = project.image)}
						href={project.link}
						data-image={project.image}
						class="w-fit"
					>
						<div class="flex w-fit items-end gap-9 text-theme-black opacity-60 hover:opacity-100">
							<div
								class="font-bricolage-grotesque flex flex-row items-end justify-end text-[2rem] leading-[80%] uppercase"
							>
								<span>{i > 8 ? i + 1 : '0' + (i + 1)}.</span>
							</div>
							<div class="flex gap-4">
								<div class="flex items-start gap-1">
									<span class="font-bricolage-grotesque text-[1rem] leading-[80%] uppercase"
										>Titre</span
									>
									<h3 class="font-bricolage-grotesque text-[2rem] leading-[80%] uppercase">
										{project.title}
									</h3>
								</div>
								<div class="flex items-start gap-1">
									<span class="font-bricolage-grotesque text-[1rem] leading-[80%] uppercase"
										>Année</span
									>
									<h3 class="font-bricolage-grotesque text-[2rem] leading-[80%] uppercase">
										{project.year}
									</h3>
								</div>
							</div>
						</div>
					</a>
				{/each}
				<div class="h-1 shrink-0"></div>
			</div>
		</div>

		<!-- Section Indic -->
		<div class="sticky bottom-8 mt-auto flex min-h-0 flex-col justify-end gap-[20vh]">
			<div
				class="bottom-0 flex flex-1 translate-x-[calc(50%-11px)] -rotate-90 items-center justify-end gap-4"
			>
				<hr class="h-[2px] w-full min-w-[50px] bg-theme-black" />
				<span class="font-bricolage-grotesque text-[1.25rem] leading-[110%] font-medium uppercase"
					>scroll</span
				>
			</div>
			<h2 class="-mb-6 font-amiri text-[3rem] uppercase">Index</h2>
		</div>
	</div>
</div>
