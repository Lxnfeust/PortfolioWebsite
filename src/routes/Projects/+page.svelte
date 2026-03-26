<script lang="ts">
	let imageCover: string = $state('/images/la_nuit_des_musees.jpg');

	const projects = [
		{
			title: 'Nuit des Musées',
			year: 2024,
			link: '/projects/nuit-des-musees',
			image: '/images/pr_nuit_des_musees/cover_nuit_des_musees.jpg',
		},
		{
			title: 'A.A.L.C.C',
			year: 2025,
			link: '/projects/aalcc',
			image: '/images/pr_aalcc/cover_aalcc.jpg',
		},
		{
			title: 'Série Motion',
			year: 2026,
			link: '/projects/serie-motion',
			image: '/images/pr_serie_motion/cover_serie_motion.jpg',
		},
		{
			title: 'Château Lagrange',
			year: 2025,
			link: '/projects/chateau-lagrange',
			image: '/images/pr_chateau_lagrange/cover_chateau_lagrange.jpg',
		},
		{
			title: 'Showreel',
			year: 2024,
			link: '/projects/showreel',
			image: '/images/pr_showreel/cover_showreel.jpg',
		},
		{
			title: 'Bacchanight',
			year: 2023,
			link: '/projects/bacchanight',
			image: '/images/pr_bacchanight/cover_bacchanight.jpg',
		},
		{
			title: 'Valeria',
			year: 2024,
			link: '/projects/valeria',
			image: '/images/pr_valeria/cover_valeria.jpg',
		},
		{
			title: 'Sapio Spirits',
			year: 2026,
			link: '/projects/sapio-spirits',
			image: '/images/pr_sapio_spirits/cover_sapio_spirits.jpg',
		},
		{
			title: 'Domaine Giscours',
			year: 2026,
			link: '/projects/domaine-giscours',
			image: '/images/pr_domaine_giscours/cover_domaine_giscours.jpg',
		},
		{
			title: 'La Boîte à Cailloux',
			year: 2024,
			link: '/projects/la-boite-a-cailloux',
			image: '/images/pr_la_boite_a_cailloux/cover_la_boite_a_cailloux.jpg',
		},
		{
			title: 'Bikers au Grand Coeur',
			year: 2024,
			link: '/projects/bikers-au-grand-coeur',
			image: '/images/pr_bikers_au_grand_coeur/cover_bikers_au_grand_coeur.jpg',
		}
	];
</script>

<div class="mx-8 flex h-full min-h-0 flex-1 flex-col gap-6 overflow-hidden">
	<div class="pointer-events-none sticky flex items-baseline gap-2 xl:gap-4">
		<span class="flex font-metal text-[1.25rem] leading-[85%] uppercase md:text-[2rem] xl:text-[2.5rem]">
			B.
		</span>
		<h1 class="xl:leading-[100%] 2l:leading-[70%] -mb-9 flex font-amiri text-[2.5rem] uppercase md:text-[4rem] xl:text-[8rem] 2xl:text-[10rem]">
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
			<div class="hidden xl:flex sticky top-0 h-full min-h-0 flex-1 flex-col justify-between pb-8">
				<div class="relative m-auto xl:h-[382px] xl:w-[440px] 2xl:h-[416px] 2xl:w-[480px] 3xl:h-[520px] 3xl:w-[600px] bg-theme-black">
					<img src={imageCover} alt="" class="absolute inset-0 h-full w-full" />
				</div>
				<div class="flex w-[40vw] flex-col gap-4">
					<h3 class="font-bricolage-grotesque text-[1.25rem] md:text-[1.5rem] 2xl:text-[2rem] leading-[80%] uppercase">Liste de tous mes projets.</h3>
					<p class="font-bricolage-grotesque text-[1rem] leading-[100%] font-regular">
						Voici l'ensemble de mes projets, réalisés en alternance et scolaires. Restez à l'affût,
						vous pourriez voir de nouveaux projets bientôt !
					</p>
				</div>
			</div>

			<!-- Index -->
			<div class="relative z-20 flex max-h-full flex-1 flex-col gap-20 mt-[2rem] xl:ml-[4rem] 2xl:ml-[8rem]">
				{#each projects as project, i (i)}
					<a
						onmouseenter={() => (imageCover = project.image)}
						href={project.link}
						data-image={project.image}
						class="w-fit"
					>
						<div class="flex w-fit items-center xl:items-end gap-4 md:gap-9 text-theme-black opacity-60 hover:opacity-100">
							<div
								class="font-bricolage-grotesque flex flex-row items-end justify-end text-[1rem] md:text-xl leading-[80%] uppercase"
							>
								<span>{i > 8 ? i + 1 : '0' + (i + 1)}.</span>
							</div>
							<div class="flex flex-col md:flex md:flex-row gap-2">
								<div class="flex items-start gap-1">
									<span class="font-bricolage-grotesque text-[0.75rem] md:text-[1rem] leading-[80%] uppercase">
										Titre
									</span>
									<h3 class="font-bricolage-grotesque text-[1.25rem] md:text-[1.5rem] 2xl:text-[2rem] leading-[70%] uppercase">
										{project.title}
									</h3>
								</div>
								<div class="flex items-start gap-1">
									<span class="font-bricolage-grotesque text-[0.75rem] md:text-[1rem] leading-[80%] uppercase">
										Année
									</span>
									<h3 class="font-bricolage-grotesque text-[1.25rem] md:text-[1.5rem] 2xl:text-[2rem] leading-[70%] uppercase">
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
		<div class="absolute right-[32px] md:right-0 md:sticky bottom-8 md:mt-auto flex min-h-0 flex-col justify-end gap-[15vh] pb-[5rem] xl:gap-[20vh] xl:pb-[0rem]">
			<div
				class="bottom-0 flex flex-1 translate-x-[calc(50%-11px)] -rotate-90 items-center justify-end gap-4"
			>
				<hr class="h-[2px] w-full min-w-[50px] bg-theme-black" />
				<span class="font-bricolage-grotesque text-[1rem] md:text-xl leading-[110%] font-medium uppercase"
					>scroll</span
				>
			</div>
			<h2 class="-mb-6 rotate-270 translate-x-[calc(50%-11px)] font-amiri text-[2rem] leading-[85%] uppercase italic xl:rotate-none xl:translate-x-0 xl:text-[3rem]">Index</h2>
		</div>
	</div>
</div>
