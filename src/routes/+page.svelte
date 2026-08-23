<script lang="ts">
	import { projects } from '$lib/data/projects';

	// --- Vitrine "Projets sélectionnés" ---
	const featured = [projects.haeon, projects.nuitDesMusees, projects.aalcc, projects.serieMotion];

	let activeIndex = $state(0);
	const active = $derived(featured[activeIndex]);

	function selectProject(i: number) {
		activeIndex = i;
	}
	function goPrev() {
		activeIndex = (activeIndex - 1 + featured.length) % featured.length;
	}
	function goNext() {
		activeIndex = (activeIndex + 1) % featured.length;
	}

	// --- Teaser Laboratoire : trainée d'images qui suit le tracé de la souris ---
	const previewImages = [
		'/images/laboratory/genshin.png',
		'/images/laboratory/humanoid.png',
		'/images/laboratory/kernel.jpg',
		'/images/laboratory/nuances.png',
		'/images/laboratory/sample.jpg',
		'/images/laboratory/spike.png',
		'/images/laboratory/t-shirt.jpg'
	];

	type TrailItem = { id: number; x: number; y: number; src: string };
	let trail: TrailItem[] = $state([]);
	let trailIdCounter = 0;
	let lastSpawn = 0;

	const SPAWN_INTERVAL = 120;
	const TRAIL_LIFETIME = 700;

	function handleLabMove(e: MouseEvent) {
		const now = Date.now();
		if (now - lastSpawn < SPAWN_INTERVAL) return;
		lastSpawn = now;

		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const id = trailIdCounter++;
		const src = previewImages[Math.floor(Math.random() * previewImages.length)];

		trail = [...trail, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, src }];

		setTimeout(() => {
			trail = trail.filter((t) => t.id !== id);
		}, TRAIL_LIFETIME);
	}
</script>

<div class="container_home px-6 pb-6 pt-8 gap-50 md:gap-60 xl:gap-80 bg-theme-white">
	<!-- HERO -->
	<div class="flex flex-col items-center text-center">
		<h1 class="font-diolce text-4.5xl leading-[85%] uppercase md:text-5xl xl:text-7.5xl">
			Designer &amp; DA Junior
		</h1>
		<div class="mt-[20vh] flex w-60 flex-col gap-2 3xl:w-[12.5vw]">
			<p class="text-base leading-[105%]">Bonjour et bienvenue sur mon portfolio, moi c'est Mattéo.</p>
			<p class="text-base leading-[105%]">
				Designer 360, en éternelle quête de renouvellement de mes moyens d'expression créatifs.
			</p>
		</div>
		<div class="mb-[10vh]"></div>
	</div>

	<!-- SECTION : Projets sélectionnés -->
	<div class="flex flex-col gap-4 xl:gap-8">
		<hr class="h-px w-full bg-theme-black" />
		<div class="flex items-end justify-between">
			<h2 class="text-2xl xl:text-3.5xl leading-[105%] font-medium uppercase">Projets sélectionnés</h2>
			<a href="/projects" class="text-base leading-[105%] font-medium uppercase md:text-xl">
				Tous les projets&nbsp;→
			</a>
		</div>

		<!-- Vitrine -->
		<div class="relative h-[80vh] w-full overflow-hidden rounded bg-theme-black md:aspect-video md:h-[80vh] md:max-h-[80vh]">
			<a href={`/projects/${active.slug}`} class="absolute inset-0 block">
				<picture>
					<source media="(max-width: 1100px)" srcset={active.coverMobile ?? active.cover} />
					<img src={active.cover} alt={active.name} class="h-full w-full object-cover" />
				</picture>
			</a>

			<div class="pointer-events-none absolute inset-0 flex items-end p-2 md:p-4">
				<div class="pointer-events-auto flex w-full md:max-w-[50vw] xl:max-w-[40vw] 2xl:max-w-[35vw] 3xl:max-w-[30vw] flex-col gap-2 md:gap-4">
					<!-- Bloc miniatures : chaque miniature + sa ligne indicatrice sous elle -->
					<div class="flex w-full gap-2 rounded bg-theme-white p-2 md:gap-4 md:p-4">
						{#each featured as project, i (project.slug)}
							<button
								type="button"
								onclick={() => selectProject(i)}
								aria-label={`Voir ${project.name}`}
								class="group flex flex-1 cursor-pointer flex-col items-center gap-1 md:gap-2"
							>
								<img
									src={project.cover}
									alt=""
									class="w-full rounded object-cover transition duration-300 h-20 md:h-20 xl:h-25 2xl:h-30 3xl:h-[140px] {i ===
									activeIndex
										? ''
										: 'grayscale group-hover:grayscale-0'}"
								/>
								<span
									class="h-[2px] rounded-full bg-theme-black transition-all duration-300 {i ===
									activeIndex
										? 'w-full'
										: 'w-0 group-hover:w-full'}"
								></span>
							</button>
						{/each}
					</div>

					<!-- Assemblage flèche / nom & année / flèche : 3 divs séparées, gap 16px, hauteur ~50px -->
					<div class="flex h-8 w-full items-stretch gap-2 md:h-[50px] md:gap-4">
						<button
							type="button"
							onclick={goPrev}
							aria-label="Projet précédent"
							class="flex h-full w-fit cursor-pointer items-center justify-center rounded bg-theme-white px-2 md:px-4"
						>
							<svg width="12" height="9" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:h-[15px] md:w-[20px]">
								<path
									d="M7.68695 1.07644e-06C7.50145 0.714287 7.24638 1.46206 6.92174 2.24331C6.5971 3.04688 6.17971 3.78348 5.66956 4.45313C5.15942 5.14509 4.54493 5.6808 3.82609 6.06027L3.82609 6.1942L20 5.85938L20 9.17411L3.82609 8.83929L3.82609 8.97322C4.56811 9.46429 5.2058 10.0335 5.73913 10.6808C6.27246 11.3504 6.70145 12.0536 7.02609 12.7902C7.35072 13.5491 7.61739 14.2857 7.82609 15L3.96522 15C3.77971 14.1071 3.52464 13.2478 3.2 12.4219C2.85217 11.6183 2.42319 10.8817 1.91304 10.2121C1.37971 9.54241 0.742029 8.99554 -5.62004e-07 8.57143L-7.46411e-07 6.46206C1.06666 5.81473 1.92464 4.93304 2.57391 3.81697C3.22319 2.72322 3.68696 1.45089 3.96521 1.40181e-06L7.68695 1.07644e-06Z"
									fill="#151515"
								/>
							</svg>
						</button>
						<div class="flex flex-1 items-center justify-between gap-2 rounded bg-theme-white px-2 py-2 md:gap-6 md:px-4 md:py-4">
							<div class="flex items-start gap-1 xl:gap-1.5">
								<span class="text-[10px] md:text-[12px] xl:text-[14px] 2xl:text-[16px] leading-[105%] uppercase">Titre</span>
								<span class="text-sm md:text-[16px] xl:text-[20px] 2xl:text-[24px] font-medium leading-none uppercase">{active.name}</span>
							</div>
							<div class="flex items-start gap-1 xl:gap-1.5">
								<span class="text-[10px] md:text-[12px] xl:text-[14px] 2xl:text-[16px] leading-[105%] uppercase">Année</span>
								<span class="text-sm md:text-[16px] xl:text-[20px] 2xl:text-[24px] font-medium leading-none uppercase">{active.year}</span>
							</div>
						</div>
						<button
							type="button"
							onclick={goNext}
							aria-label="Projet suivant"
							class="flex h-full w-fit cursor-pointer items-center justify-center rounded bg-theme-white px-2 md:px-4"
						>
							<svg
								width="12"
								height="9"
								viewBox="0 0 20 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="rotate-180 md:h-[15px] md:w-[20px]"
							>
								<path
									d="M7.68695 1.07644e-06C7.50145 0.714287 7.24638 1.46206 6.92174 2.24331C6.5971 3.04688 6.17971 3.78348 5.66956 4.45313C5.15942 5.14509 4.54493 5.6808 3.82609 6.06027L3.82609 6.1942L20 5.85938L20 9.17411L3.82609 8.83929L3.82609 8.97322C4.56811 9.46429 5.2058 10.0335 5.73913 10.6808C6.27246 11.3504 6.70145 12.0536 7.02609 12.7902C7.35072 13.5491 7.61739 14.2857 7.82609 15L3.96522 15C3.77971 14.1071 3.52464 13.2478 3.2 12.4219C2.85217 11.6183 2.42319 10.8817 1.91304 10.2121C1.37971 9.54241 0.742029 8.99554 -5.62004e-07 8.57143L-7.46411e-07 6.46206C1.06666 5.81473 1.92464 4.93304 2.57391 3.81697C3.22319 2.72322 3.68696 1.45089 3.96521 1.40181e-06L7.68695 1.07644e-06Z"
									fill="#151515"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- SECTION : Teaser Laboratoire -->
	<div class="flex flex-col gap-4 xl:gap-8">
		<hr class="h-px w-full bg-theme-black" />
		<div class="flex items-end justify-between">
			<h2 class="text-2xl xl:text-3.5xl leading-[105%] font-medium uppercase">En voir plus&nbsp;?</h2>
			<a href="/laboratory" class="text-base leading-[105%] font-medium uppercase md:text-xl">
				Laboratoire&nbsp;→
			</a>
		</div>

		<a
			href="/laboratory"
			onmousemove={handleLabMove}
			class="relative block h-[50vh] w-full overflow-hidden rounded bg-theme-black"
		>
			{#each trail as item (item.id)}
				<img
					src={item.src}
					alt=""
					class="trail-image pointer-events-none absolute h-32 w-24 rounded bg-theme-black object-contain md:h-40 md:w-28"
					style="left: {item.x}px; top: {item.y}px;"
				/>
			{/each}

			<div class="pointer-events-none absolute inset-0 flex items-end p-2 md:p-4">
				<p class="text-base leading-[105%] text-theme-white uppercase">
					Créations spontanées &amp; expérimentations
				</p>
			</div>
		</a>
	</div>

	<a
		href="#top"
		class="flex justify-center border-y py-4 text-base leading-[105%] font-medium uppercase text-[1rem] md:text-xl"
	>
		Remonter la page
	</a>
</div>