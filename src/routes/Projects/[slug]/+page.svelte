<script lang="ts">
	import type { PageProps } from './$types';
	import { projects } from '$lib/data/projects';
	let { data }: PageProps = $props();

	const projectList = Object.values(projects);
	const nextProject = $derived(
		projectList.find((project) => Number(project.id) === Number(data.id) + 1) ||
			projectList.find((project) => Number(project.id) === 1)
	);
</script>



<section class="flex flex-col gap-30 px-6 pt-6 xl:flex-col xl:h-[calc(100lvh-72px)] xl:overflow-x-auto xl:gap-0 xl:px-0 xl:pt-0">
  
	<!-- TITLE -->
	<div class="flex items-baseline gap-2 xl:sticky xl:left-0 xl:z-10 xl:min-w-fit xl:px-6 xl:pt-10">
		<span class="self-start font-metal text-xl leading-[85%] md:self-end md:text-3.5xl xl:self-auto xl:text-4.5xl">
			{data.id > 9 ? data.id : '0' + data.id}.
		</span>
		<h1 class="font-amiri text-4.5xl leading-[70%] uppercase italic md:text-6.5xl xl:text-10xl xl:-mb-9">
			{data.name}
		</h1>
		<hr class="h-px min-w-20 grow self-end bg-theme-black" />
	</div>

  	<!-- CONTENU SCROLLABLE -->
  	<div class="flex flex-col gap-20 xl:flex-row xl:w-fit xl:h-full xl:items-end xl:px-6 xl:pt-30 xl:pb-8 xl:gap-50">
		<!-- CONTEXT -->
		<div class="flex flex-col gap-16 xl:flex-row xl:h-full xl:w-[1000px] xl:shrink-0 xl:relative">

			<span class="font-metal text-2.5xl leading-[85%] uppercase md:text-4.5xl xl:absolute xl:left-0 xl:bottom-0">{data.year}</span>

			<div class="flex flex-col gap-19.5 xl:shrink-0 xl:justify-center xl:w-110 xl:mx-auto">
				<div class="flex flex-col gap-16 md:flex-row-reverse md:gap-22.5 xl:flex-col">
					<div class="flex flex-col gap-4">
						<h3 class="text-xl leading-[105%] font-medium uppercase">{data.title}</h3>
						<p class="leading-[105%]">{data.description}</p>
					</div>
				</div>
				<div class="hidden flex-col items-center gap-4 md:flex xl:flex-row xl:absolute xl:right-0 xl:bottom-0">
					<span class="leading-[105%] font-medium uppercase">Scroll</span>
					<hr class="h-12.5 w-px bg-theme-black xl:h-px xl:w-12.5" />
				</div>
			</div>
		</div>

		<!-- COVER -->
		<img
			src={data.presentation_image.src}
			alt={data.presentation_image.alt}
			class="w-full rounded xl:h-full xl:w-auto xl:max-w-none xl:object-cover"
		/>

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
			<span class="hidden font-amiri text-2.5xl leading-[85%] uppercase md:text-4.5xl xl:flex xl:absolute xl:left-0 xl:bottom-0">Voir Plus :</span>
			<span class="hidden leading-[105%] font-medium uppercase xl:flex xl:absolute xl:right-0 xl:bottom-0">{data.name}</span>
		</div>

		<!-- POSTER -->
		{#if data.poster}
			<div class="bg-theme-black p-2 xl:h-full xl:w-auto xl:shrink-0">
				<img src={data.poster.src} alt={data.poster.alt} class="w-full rounded xl:h-full xl:w-auto xl:object-cover" />
			</div>
		{/if}

		<!-- GRID IMAGES -->
		<div class="grid gap-2 bg-theme-black p-2 md:grid-cols-2 xl:grid-cols-2 xl:grid-rows-2 xl:h-full xl:w-auto xl:shrink-0">
			{#each data.images as image}
				<img src={image.src} alt={image.alt} class="aspect-video rounded object-cover xl:h-full xl:w-auto" />
			{/each}
		</div>

    	<!-- NEXT PROJECT -->
    	{#if nextProject}
      		<div class="flex justify-center xl:items-center xl:h-full xl:shrink-0 xl:w-[1000px]">
        		<a href={`/projects/${nextProject.slug}`} class="mx-16 mt-20 mb-16 flex max-w-100 flex-col gap-2 xl:mt-0 xl:mb-0">
          			<div class="flex items-end gap-1">
            			<span class="text-xs leading-none font-medium">{Number(nextProject.id) > 9 ? nextProject.id : '0' + nextProject.id}.</span>
            			<span class="text-xl leading-[105%] font-medium uppercase">{nextProject.name}</span>
          			</div>
          			<img src={nextProject.presentation_image.src} alt={nextProject.presentation_image.alt} class="aspect-4/3 w-full" />
          			<span class="self-end leading-[105%] font-medium uppercase">Next project →</span>
        		</a>
      		</div>
    	{/if}
  	</div>
</section>
