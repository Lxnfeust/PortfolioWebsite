<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import gsap from 'gsap';
	import { projects } from '$lib/data/projects';

	// --- Vitrine "Projets sélectionnés" ---
	const featured = [projects.haeon, projects.nuitDesMusees, projects.aalcc, projects.serieMotion];

	let activeIndex = $state(0);
	const active = $derived(featured[activeIndex]);

	function goPrev() {
		activeIndex = (activeIndex - 1 + featured.length) % featured.length;
	}
	function goNext() {
		activeIndex = (activeIndex + 1) % featured.length;
	}

	// --- Teaser Laboratoire : image flottante qui suit le curseur ---
	const previewImages = [
		'/images/laboratory/genshin.png',
		'/images/laboratory/humanoid.png',
		'/images/laboratory/kernel.jpg',
		'/images/laboratory/nuances.png',
		'/images/laboratory/sample.jpg',
		'/images/laboratory/spike.png',
		'/images/laboratory/t-shirt.jpg'
	];

	let previewEl: HTMLDivElement;
	let previewImg: HTMLImageElement;
	let showPreview = $state(false);
	let quickX: gsap.QuickToFunc;
	let quickY: gsap.QuickToFunc;
	let shuffleInterval: ReturnType<typeof setInterval> | undefined;

	onMount(() => {
		gsap.set(previewEl, { xPercent: -50, yPercent: -50 });
		quickX = gsap.quickTo(previewEl, 'x', { duration: 0.5, ease: 'power3' });
		quickY = gsap.quickTo(previewEl, 'y', { duration: 0.5, ease: 'power3' });
	});

	onDestroy(() => {
		if (shuffleInterval) clearInterval(shuffleInterval);
	});

	function pickRandomImage() {
		if (!previewImg) return;
		previewImg.src = previewImages[Math.floor(Math.random() * previewImages.length)];
	}

	function handlePreviewEnter() {
		pickRandomImage();
		showPreview = true;
		shuffleInterval = setInterval(pickRandomImage, 800);
	}

	function handlePreviewLeave() {
		showPreview = false;
		if (shuffleInterval) clearInterval(shuffleInterval);
	}

	function handlePreviewMove(e: MouseEvent) {
		quickX(e.clientX);
		quickY(e.clientY);
	}
</script>

<div class="container_home px-6 pb-6">
	<!-- HERO -->
	<div class="flex min-h-[60lvh] flex-col items-center justify-center gap-12 text-center md:min-h-[70lvh] md:gap-16">
		<h1 class="font-diolce text-[2rem] leading-[105%] uppercase md:text-[3rem] xl:text-[4rem]">
			Designer &amp; DA Junior
		</h1>
		<div class="flex flex-col gap-2">
			<p class="text-base leading-[105%]">Bonjour et bienvenue sur mon portfolio, moi c'est Mattéo.</p>
			<p class="text-base leading-[105%]">
				Designer 360, en éternelle quête de renouvellement de mes moyens d'expression créatifs.
			</p>
		</div>
	</div>

	<hr class="mb-16 h-px w-full bg-theme-black" />

	<div class="flex flex-col gap-16">
		<div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-0">
			<h2 class="font-diolce text-3.5xl leading-[85%] uppercase md:text-5xl xl:text-7.5xl">
				Projets sélectionnés
			</h2>
			<a href="/projects" class="text-base leading-[105%] font-medium uppercase md:mb-1 text-[1rem] md:text-xl">
				Voir tous les projets&nbsp;→
			</a>
		</div>

		<!-- Vitrine -->
		<div class="relative aspect-video w-full overflow-hidden rounded bg-theme-black">
			<a href={`/projects/${active.slug}`} class="absolute inset-0 block">
				<img src={active.cover} alt={active.name} class="h-full w-full object-cover" />
			</a>

			<div class="pointer-events-none absolute inset-0 flex items-end p-4">
				<div class="pointer-events-auto flex flex-col gap-2">
					<div class="flex gap-2">
						{#each featured as project, i (project.slug)}
							<button
								onclick={() => (activeIndex = i)}
								aria-label={`Voir ${project.name}`}
								class="h-14 w-14 shrink-0 cursor-pointer overflow-hidden rounded transition duration-300 md:h-16 md:w-16"
								class:ring-2={i === activeIndex}
								class:ring-theme-white={i === activeIndex}
								class:opacity-50={i !== activeIndex}
							>
								<img src={project.cover} alt="" class="h-full w-full object-cover" />
							</button>
						{/each}
					</div>

					<div class="flex items-stretch overflow-hidden rounded bg-theme-white text-theme-black">
						<button
							onclick={goPrev}
							aria-label="Projet précédent"
							class="flex w-10 shrink-0 cursor-pointer items-center justify-center text-base"
						>
							←
						</button>
						<div class="flex items-center gap-6 px-4 py-2">
							<div class="flex items-baseline gap-2">
								<span class="text-xs leading-[105%] uppercase">Titre</span>
								<span class="font-medium leading-none uppercase">{active.name}</span>
							</div>
							<div class="flex items-baseline gap-2">
								<span class="text-xs leading-[105%] uppercase">Année</span>
								<span class="font-medium leading-none uppercase">{active.year}</span>
							</div>
						</div>
						<button
							onclick={goNext}
							aria-label="Projet suivant"
							class="flex w-10 shrink-0 cursor-pointer items-center justify-center text-base"
						>
							→
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div
		class="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-end md:gap-0"
		onmouseenter={handlePreviewEnter}
		onmouseleave={handlePreviewLeave}
		onmousemove={handlePreviewMove}
		role="presentation"
	>
		<h2 class="font-diolce text-3.5xl leading-[85%] uppercase md:text-5xl xl:text-7.5xl">
			En voir plus&nbsp;?
		</h2>
		<a href="/laboratory" class="text-base leading-[105%] font-medium uppercase md:mb-1 text-[1rem] md:text-xl">
			Visiter le laboratoire&nbsp;→
		</a>
	</div>

	<div class="flex flex-col items-center gap-6 text-center">
		<p class="max-w-60 text-base leading-[105%]">
			Découvrez mes créations spontanées, des projets qui alimentent et font part de mon esprit
			créatif.
		</p>
		<a href="/projects" class="text-base leading-[105%] font-medium uppercase text-[1rem] md:text-xl">
			Découvrir&nbsp;→
		</a>
	</div>

	<a
		href="#top"
		class="flex justify-center border-y py-4 text-base leading-[105%] font-medium uppercase text-[1rem] md:text-xl"
	>
		Remonter la page
	</a>
</div>

<div
	bind:this={previewEl}
	class="pointer-events-none fixed top-0 left-0 z-40 hidden h-40 w-32 overflow-hidden rounded opacity-0 transition-opacity duration-300 xl:block"
	class:opacity-100={showPreview}
>
	<img bind:this={previewImg} src={previewImages[0]} alt="" class="h-full w-full object-cover" />
</div>