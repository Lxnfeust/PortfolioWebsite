<script lang="ts">
	const passionsAndQualitiesContent = [
		{
			title: 'Passions',
			description:
				'En parallèle de mes projets de cours ou d’entreprise, j’utilise mon temps libre pour créer. Mes domaines de prédilection sont le graphisme, les effets spéciaux, la 3D et le design paramétrique.'
		},
		{
			title: 'Qualités',
			description:
				'Curieux et créatif par nature, j’aime travailler sous forme de projets en équipe. Rigoureux et autonome, impliqué et motivé, je sais organiser ma charge de travail pour mener chaque projet à bien selon les deadlines.'
		}
	];

	const schoolsAndExperiencesContent = [
		{
			title: 'Écoles',
			card: [
				{
					title: 'BUT MMI (Métiers du multimédia & internet)',
					locationOrJob: 'Bordeaux - France',
					dates: '2021-2024'
				},
				{
					title: 'ECV - MASTER Direction artistique en digital',
					locationOrJob: 'Bordeaux - France',
					dates: '2024-2026'
				}
			]
		},
		{
			title: 'Expériences pro',
			card: [
				{
					title: 'FOODTRUCK AGENCY - alternance',
					locationOrJob: 'Assistant communication',
					dates: '22023-2024'
				},
				{
					title: 'FAVOREAT DESIGN - alternance',
					locationOrJob: 'Designer',
					dates: '2024-2026'
				}
			]
		}
	];
</script>

{#snippet passionsAndQualities(item)}
	<div class="flex flex-col gap-4">
		<h3 class="text-3.5xl leading-[105%] font-medium uppercase">
			{item.title}
		</h3>
		<p class="border-y border-theme-black py-4 leading-[105%]">
			{item.description}
		</p>
	</div>
{/snippet}

{#snippet schoolsAndExperiences(item)}
	<div class="flex w-full flex-col gap-4">
		<h3 class="text-3.5xl leading-[105%] font-medium uppercase">
			{item.title}
		</h3>
		<div class="flex flex-col gap-6 border-y border-theme-black py-4 leading-[105%]">
			{#each item.card as card, i (i)}
				<div class="flex justify-between gap-4">
					<div class="flex flex-col gap-2">
						<h4 class="leading-[105%] font-bold">{card.title}</h4>
						<p class="leading-[105%]">{card.locationOrJob}</p>
					</div>
					<span class="leading-[105%]">{card.dates}</span>
				</div>
			{/each}
		</div>
	</div>
{/snippet}

<div class="mx-8 flex h-full min-h-0 flex-1 flex-col gap-6">
	<div class="flex flex-col justify-between gap-40 pb-8">
		<div class="flex flex-col gap-6">
			<div class="heading flex items-baseline gap-2 xl:gap-4">
				<h1 class="2l:leading-[70%] -mb-9 flex font-diolce text-[2.5rem] uppercase md:text-[4rem] xl:text-[8rem] xl:leading-[100%] 2xl:text-[9rem]">
					À propos de moi
				</h1>
			</div>
			<div class="flex gap-2 text-xs font-medium uppercase">
				<a href="/" class="leading-[105%]">Accueil</a>
				<span class="leading-[105%]">></span>
				<p class="leading-[105%]">À propos de moi</p>
			</div>
		</div>
		<div class="flex flex-col gap-20 lg:flex-row">
			<div class="relative aspect-square h-85 w-full md:h-130 xl:h-160 xl:max-w-160">
				<img src="" alt="" class="absolute inset-0 h-full w-full object-cover" />
			</div>
			<div class="flex flex-col-reverse gap-20 md:flex-col md:gap-40">
				<div class="flex flex-col gap-20 md:flex-row md:gap-8">
					<div class="flex flex-1 flex-col gap-10 md:gap-4">
						{#each passionsAndQualitiesContent as item, i (i)}
							<div class="flex gap-16">
								{@render passionsAndQualities(item)}
							</div>
						{/each}
					</div>
					<div class="flex flex-1 flex-col gap-10 md:gap-4">
						{#each schoolsAndExperiencesContent as item, i (i)}
							<div class="flex gap-16">
								{@render schoolsAndExperiences(item)}
							</div>
						{/each}
					</div>
				</div>
				<div>
					<div class="flex flex-col gap-4">
						<h3 class="text-3.5xl leading-[105%] font-medium uppercase">En savoir plus</h3>
						<div
							class="flex flex-col justify-between gap-4 border-y border-theme-black py-4 md:flex-row"
						>
							<p class="max-w-140 leading-[105%]">
								Toutes les informations concernant mes expériences scolaires et professionnelles
								peuvent être trouvées sur mon CV. Vous pourrez aussi y trouver de brèves
								descriptions de mes intérêts et passions.
							</p>
							<a
								href=""
								download
								class="self-end text-xl leading-[105%] font-medium uppercase underline underline-offset-4 md:self-auto"
							>
								Télécharger mon cv
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
