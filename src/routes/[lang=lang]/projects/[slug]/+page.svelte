<script lang="ts">
	
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import { localizedHref, dictionaries } from '$lib/i18n';
	import { projects } from '$lib/data/projects';
	import { localizeProject } from '$lib/i18n';

	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let { data }: PageProps = $props();

	const lang = $derived(page.params.lang as 'fr' | 'en');
	const t = $derived(dictionaries[lang]);

	const projectListRaw = Object.values(projects);
	const nextProjectRaw = $derived(
		projectListRaw.find((project) => Number(project.id) === Number(data.id) + 1) ||
			projectListRaw.find((project) => Number(project.id) === 1)
	);
	const nextProject = $derived(
		nextProjectRaw ? localizeProject(nextProjectRaw, lang) : undefined
	);

	function isVideo(src: string) {
		return /\.(mp4|webm|ogg)$/i.test(src);
	}

	function horizontalScroll(node) {
		const handler = (e) => {
			if (window.innerWidth >= 1280 && e.deltaY !== 0) {
				e.preventDefault();
				node.scrollLeft += e.deltaY;
			}
		};
		node.addEventListener('wheel', handler, { passive: false });
		return {
			destroy() {
				node.removeEventListener('wheel', handler);
			}
		};
	}

	// --- Grille de 4 images/vidéos : taille de case calculée dynamiquement ---
	let coverEl;
	let gridEl;
	let gridSizeStyle = $state('');

	function getMediaRatio(src: string): Promise<number> {
		return new Promise((resolve) => {
			if (isVideo(src)) {
				const v = document.createElement('video');
				v.preload = 'metadata';
				v.onloadedmetadata = () => resolve(v.videoWidth / v.videoHeight || 1);
				v.onerror = () => resolve(1);
				v.src = src;
			} else {
				const img = new Image();
				img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 1);
				img.onerror = () => resolve(1);
				img.src = src;
			}
		});
	}

	async function computeGridSizing() {
		if (!browser) return;

		if (window.innerWidth < 1280) {
			gridSizeStyle = ''; // en dessous de xl, on ne touche à rien : comportement mobile/tablette inchangé
			return;
		}

		if (!coverEl) return;
		const fullHeight = coverEl.clientHeight;
		if (!fullHeight) return;

		const ratios = await Promise.all(data.images.map((img) => getMediaRatio(img.src)));
		const widestRatio = ratios.length > 0 ? Math.max(...ratios) : 1;

		const GRID_PADDING = 8; // p-2, en px, appliqué en haut ET en bas
		const GRID_GAP = 8; // gap-2, en px, entre les 2 lignes

		const availableHeight = fullHeight - GRID_PADDING * 2 - GRID_GAP;
		const rowHeight = availableHeight / 2;
		const colWidth = rowHeight * widestRatio;

		gridSizeStyle = `grid-template-columns: ${colWidth}px ${colWidth}px; grid-template-rows: ${rowHeight}px ${rowHeight}px;`;
	}

	function handleGridResize() {
		computeGridSizing();
	}

	onMount(() => {
		computeGridSizing();
		window.addEventListener('resize', handleGridResize);
	});

	onDestroy(() => {
		if (browser) window.removeEventListener('resize', handleGridResize);
	});
	// ---------------------------------------------------------------------

	let container;

	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		requestAnimationFrame(() => {
			window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			container?.scrollTo({ top: 0, left: 0, behavior: 'instant' });
			computeGridSizing();
		});
	});
</script>

<!--NE PAS INDEXER LES PAGES DE PROJETS EN ENTREPRISE-->
<svelte:head>
	{#if data.noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>



<section use:horizontalScroll bind:this={container} class="flex flex-col gap-10 px-6 pt-6 xl:flex-col xl:h-[calc(100lvh-72px)] xl:overflow-x-auto xl:gap-0 xl:px-0 xl:pt-0">

	<!-- TITLE -->
	<div class="flex flex-col gap-6 xl:sticky xl:left-0 xl:z-10 xl:min-w-fit xl:px-6 md:pt-0 xl:pt-4">
		<div class="flex items-baseline gap-2 xl:gap-4 xl:left-0">
			<h1 class="flex font-diolce text-4.5xl leading-[85%] uppercase md:text-5xl xl:text-7.5xl">
				{data.name}
			</h1>
		</div>
		<!--
		<div class="flex gap-2 left-0">
			<a href={localizedHref(lang, '/')} class="text-xs xl:text-[1rem] leading-[105%]">{t.nav.home}</a>
			<span class="text-xs xl:text-[1rem] leading-[105%]">&#62;</span>
			<a href={localizedHref(lang, '/projects')} class="text-xs xl:text-[1rem] leading-[105%]">{t.nav.projects}</a>
			<span class="text-xs xl:text-[1rem] leading-[105%]">&#62;</span>
			<span class="text-xs xl:text-[1rem] leading-[105%]">{data.name}</span>
		</div>
		-->
	</div>

  	<!-- CONTENU SCROLLABLE -->
  	<div class="flex flex-col gap-20 xl:flex-row xl:w-fit xl:h-full xl:min-h-0 xl:items-end xl:px-6 xl:pt-14 xl:pb-8 xl:gap-50">
		<!-- CONTEXT -->
		<div class="flex flex-col gap-16 xl:flex-row xl:h-full xl:w-[800px] 2xl:w-[1000px] xl:shrink-0 xl:relative">

			<span class="font-diolce text-2.5xl leading-[85%] uppercase md:text-4.5xl xl:absolute xl:left-0 xl:bottom-0">{data.year}</span>

			<div class="flex flex-col gap-19.5 xl:shrink-0 xl:justify-center xl:w-110 xl:mx-auto">
				<div class="flex flex-col gap-16 md:flex-row-reverse md:gap-22.5 xl:flex-col">
					<div class="flex flex-col gap-4">
						<h3 class="text-xl leading-[105%] font-medium uppercase">{data.title}</h3>
						<p class="leading-[105%]">{data.description}</p>
					</div>
				</div>
				<div class="hidden flex-col items-center gap-4 md:flex xl:hidden">
					<span class="leading-[105%] font-medium uppercase">{t.common.scroll}</span>
					<hr class="h-12.5 w-px bg-theme-black" />
				</div>
			</div>
		</div>

		<!-- COVER -->
		{#if isVideo(data.presentation_image.src)}
			<video
				bind:this={coverEl}
				src={data.presentation_image.src}
				autoplay
				loop
				muted
				playsinline
				class="w-full rounded xl:h-full xl:w-auto xl:max-w-none xl:object-cover"
			></video>
			{:else}
			<img
				bind:this={coverEl}
				src={data.presentation_image.src}
				alt={data.presentation_image.alt}
				class="w-full rounded xl:h-full xl:w-auto xl:max-w-none xl:object-cover"
			/>
		{/if}
		
		<!-- MORE INFOS -->
		<div class="flex flex-col gap-4 xl:w-110 xl:shrink-0 xl:h-full xl:relative xl:justify-center">
			<h4 class="text-xl leading-[105%] font-medium uppercase">{data.project_infos.title}</h4>
			<div class="flex flex-col gap-6">
				<p class="leading-[105%]">{data.project_infos.description}</p>
				{#if data.project_infos.links.length > 0}
					<div class="flex flex-wrap gap-8">
						{#each data.project_infos.links as link}
							<a href={link.url} target={link.target} class="flex gap-1 leading-[105%] font-medium whitespace-nowrap uppercase">
							<span class="underline underline-offset-4">{link.text}</span>
							<img src="/assets/top-right-arrow.svg" alt="" class="max-w-2.5 min-w-2.5 object-contain" />
							</a>
						{/each}
					</div>
				{/if}
			</div>
			<span class="hidden font-diolce text-2.5xl leading-[85%] uppercase md:text-4.5xl xl:flex xl:absolute xl:left-0 xl:bottom-0">{t.projectPage.seeMore}</span>
			<span class="hidden leading-[105%] font-medium uppercase xl:flex xl:absolute xl:right-0 xl:bottom-0">{data.name}</span>
		</div>

		<!-- POSTER -->
		{#if data.poster?.src}
			<div class="bg-theme-black p-2 xl:h-full xl:w-auto xl:shrink-0">
				{#if isVideo(data.poster.src)}
					<video
						src={data.poster.src}
						autoplay
						loop
						muted
						playsinline
						class="w-full rounded xl:h-full xl:w-auto xl:object-cover"
					></video>
				{:else}
					<img src={data.poster.src} alt={data.poster.alt} class="w-full rounded xl:h-full xl:w-auto xl:object-cover" />
				{/if}
			</div>
		{/if}

		<!-- GRID IMAGES -->
		<div
			bind:this={gridEl}
			style={gridSizeStyle}
			class="grid grid-cols-1 gap-2 bg-theme-black p-2 md:grid-cols-2 xl:h-full xl:w-auto xl:shrink-0 xl:grid-cols-[repeat(2,minmax(0,auto))] xl:grid-rows-[repeat(2,minmax(0,auto))]"
		>
			{#each data.images as image, i}
				{#if isVideo(image.src)}
					<video
						src={image.src}
						autoplay
						loop
						muted
						playsinline
						class="w-full rounded object-contain md:h-full md:w-full md:object-cover"
					></video>
				{:else}
					<img
						src={image.src}
						alt={image.alt}
						class="w-full rounded object-contain md:h-full md:w-full md:object-cover"
					/>
				{/if}
			{/each}
		</div>

    	<!-- NEXT PROJECT -->
    	{#if nextProject}
      		<div class="flex justify-center xl:items-center xl:h-full xl:shrink-0 xl:w-[1000px]">
        		<a href={localizedHref(lang, `/projects/${nextProject.slug}`)} class="mx-16 mt-20 mb-16 flex max-w-100 flex-col gap-2 xl:mt-0 xl:mb-0">
          			<div class="flex items-end gap-1">
            			<span class="text-xs leading-none font-medium">{Number(nextProject.id) > 9 ? nextProject.id : '0' + nextProject.id}.</span>
            			<span class="text-xl leading-[105%] font-medium uppercase">{nextProject.name}</span>
          			</div>
          			<img src={nextProject.presentation_image.src} alt={nextProject.presentation_image.alt} class="aspect-4/3 w-full object-cover" />
          			<span class="self-end leading-[105%] font-medium uppercase">{t.common.nextProject}</span>
        		</a>
      		</div>
    	{/if}
  	</div>
</section>