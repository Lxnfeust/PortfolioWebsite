<script lang="ts">
	import { page } from '$app/state';
	import { localizedHref, localizeProject } from '$lib/i18n';
	import { projects } from '$lib/data/projects';

	const lang = $derived(page.params.lang as 'fr' | 'en');

	const projectListRaw = Object.values(projects).sort((a, b) => Number(a.id) - Number(b.id));
	const projectList = $derived(projectListRaw.map((p) => localizeProject(p, lang)));

	let hoveredCover: string | null = $state(null);
	let mouseX = $state(0);
	let mouseY = $state(0);

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	}
</script>

<svelte:window onmousemove={handleMouseMove} />

<div class="px-6 pb-6 pt-8 flex h-full min-h-0 flex-1 flex-col gap-10 overflow-hidden">
	<div class="flex flex-col gap-6">
		<div class="flex items-baseline gap-2 xl:gap-4">
			<h1 class="flex font-diolce text-4.5xl leading-[85%] uppercase md:text-5xl xl:text-7.5xl">
				Projets
			</h1>
		</div>
		<!--
		<div class="flex gap-2">
			<a href={localizedHref(lang, '/')} class="text-xs leading-[105%] xl:text-[1rem]">Accueil</a>
			<span class="text-xs leading-[105%] xl:text-[1rem]">&#62;</span>
			<span class="text-xs leading-[105%] xl:text-[1rem]">Projets</span>
		</div>
		-->
	</div>

	<div class="flex min-h-0 flex-1 flex-col overflow-auto [&::-webkit-scrollbar]:hidden">
		{#each projectList as project, i (project.id)}
			<a
				href={localizedHref(lang, `/projects/${project.slug}`)}
				onmouseenter={() => (hoveredCover = project.cover)}
				onmouseleave={() => (hoveredCover = null)}
				class="group flex items-center justify-between border-t border-theme-black py-6 text-theme-black last:border-b"
			>
				<div class="flex items-center gap-4 md:gap-9">
					<span class="font-bricolage-grotesque text-base leading-[80%] uppercase md:text-xl">
						{i + 1 > 9 ? i + 1 : '0' + (i + 1)}.
					</span>
					<h3
						class="font-diolce text-2xl uppercase transition duration-500 group-hover:translate-x-3 md:text-4xl xl:text-5xl"
					>
						{project.name}
					</h3>
				</div>
				<span class="font-bricolage-grotesque text-base leading-[80%] uppercase md:text-xl">
					{project.year}
				</span>
			</a>
		{/each}
	</div>
</div>

{#if hoveredCover}
	<img
		src={hoveredCover}
		alt=""
		class="pointer-events-none fixed z-30 hidden h-40 w-60 rounded object-cover shadow-lg xl:block"
		style="left: {mouseX + 32}px; top: {mouseY - 96}px;"
	/>
{/if}