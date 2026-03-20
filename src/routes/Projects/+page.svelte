<script lang="ts">
	let imageCover: string = $state('/images/la_nuit_des_musees.jpg');

	const projects = [
		{
			title: 'Nuit des Musées',
			year: 2024,
			link: '$lib/data/projects/nuit-des-musees',
			image: '/images/nuit_des_musees.jpg'
		},
		{
			title: 'A.A.L.C.C',
			year: 2025,
			link: '$lib/data/projects/aalcc',
			image: '/images/aalcc.jpg'
		},
		{
			title: 'Série Motion',
			year: 2026,
			link: '$lib/data/projects/serie-motion',
			image: '/images/serie_motion.jpg'
		},
		{
			title: 'Château Lagrange',
			year: 2025,
			link: '$lib/data/projects/chateau-lagrange',
			image: '/images/chateau_lagrange.jpg'
		},
		{
			title: 'Showreel',
			year: 2024,
			link: '$lib/data/projects/showreel',
			image: '/images/showreel.jpg'
		},
		{
			title: 'Bacchanight',
			year: 2023,
			link: '$lib/data/projects/bacchanight',
			image: '/images/bacchanight.jpg'
		},
		{
			title: 'Valeria',
			year: 2024,
			link: '$lib/data/projects/valeria',
			image: '/images/valeria.jpg'
		},
		{
			title: 'Sapio Spirits',
			year: 2026,
			link: '$lib/data/projects/sapio-spirits',
			image: '/images/sapio_spirits.jpg'
		},
		{
			title: 'Domaine Giscours',
			year: 2026,
			link: '$lib/data/projects/domaine-giscours',
			image: '/images/domaine_giscours.jpg'
		},
		{
			title: 'La Boîte à Cailloux',
			year: 2024,
			link: '$lib/data/projects/la-boite-a-cailloux',
			image: '/images/la_boite_a_cailloux.jpg'
		},
		{
			title: 'Bikers au Grand Coeur',
			year: 2024,
			link: '$lib/data/projects/bikers-au-grand-coeur',
			image: '/images/bikers_au_grand_coeur.jpg'
		}
	];
</script>

<div class="container_projects">
	<div class="heading page_projects">
		<span>B.</span>
		<h1>Works</h1>
		<hr />
	</div>
	<div class="content_projects">
		<div class="Section_projects">
			<div class="projects_cover">
				<div class="image_cover relative">
					<img src={imageCover} alt="" class="absolute inset-0 h-full w-full" />
				</div>
				<div class="text_projects">
					<h2>Liste de tous mes projets.</h2>
					<p>
						Voici l’ensemble de mes projets, ils contiennent à la fois des travaux réalisés à
						l’école, des travaux personnels et des réalisation professionnelles réalisées en
						entreprise (dans le cadre d’alternances). Restez à l’affût, vous pourriez voir de
						nouveaux projets bientôt !
					</p>
				</div>
			</div>
			<div class="projects_index">
				{#each projects as project, i (i)}
					<a
						onmouseenter={() => (imageCover = project.image)}
						href={project.link}
						data-image={project.image}
						class="w-fit"
					>
						<div class="projects_item">
							<div class="project_item_number">
								<span>{i > 8 ? i + 1 : '0' + (i + 1)}.</span>
							</div>
							<div class="project_item_info">
								<div class="project_item_category">
									<span>Titre</span>
									<h3>{project.title}</h3>
								</div>
								<div class="project_item_category">
									<span>Année</span>
									<h3>{project.year}</h3>
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
		<div class="Section_indic">
			<div class="scroll_indic">
				<hr />
				<span>scroll</span>
			</div>
			<h2>Index</h2>
		</div>
	</div>
</div>
