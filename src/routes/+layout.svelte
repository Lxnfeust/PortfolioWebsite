<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let showMenu: boolean = $state(false);

	let { children } = $props();

	const isProjectPage = $derived(page.route.id === '/projects/[slug]');

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div
	class="fixed inset-0 z-50 h-full w-full transition duration-400"
	class:bg-theme-black-opacity={showMenu}
	class:pointer-events-none={!showMenu}
	onclick={() => (showMenu = false)}
></div>

<div class="flex h-full flex-col">

	<header class="fixed flex justify-between w-full px-8 py-6 z-50">
		<!-- Caché en dessous de xl -->
		<div class="hidden xl:flex items-center justify-between w-[25vw]">
			<div class="flex items-center justify-between w-full text-theme-black">
			<span class="text-xl leading-[105%] font-medium uppercase">Mattéo Lambert</span>
			<span class="text-xl leading-[105%] font-medium uppercase">Portfolio</span>
			</div>
		</div>

		<!-- Pleine largeur en dessous de xl, 25vw en xl -->
		<div class="flex items-center justify-between w-full xl:w-[25vw]">
			<div class="flex">
			<span class="text-base md:text-xl leading-[105%] font-medium uppercase">LANG :&nbsp;</span>
			<div class="flex">
				<span class="text-base md:text-xl leading-[105%] font-medium uppercase">FR</span>
				<span class="text-base md:text-xl leading-[105%] font-medium uppercase">&nbsp;/&nbsp;</span>
				<span class="text-base md:text-xl leading-[105%] font-medium uppercase">EN</span>
			</div>
			</div>
			<div class="menu">
			<button
				onclick={() => (showMenu = !showMenu)}
				class="cursor-pointer text-base md:text-xl leading-[105%] font-medium uppercase underline underline-offset-4"
			>Menu</button>
			<Menu bind:showMenu />
			</div>
		</div>
	</header>
	
	
	<main class="mt-18 h-full max-h-[calc(100vh-72px)] grow">
		{@render children()}
	</main>

	<Cursor />
	
</div>


<div
	class="fixed inset-0 -z-1 flex h-full w-full items-center md:items-start {isProjectPage
		? 'md:justify-start'
		: 'md:justify-center'}"
>
	<img
		src="/images/emboss_star.png"
		alt=""
		class="w-full max-w-3xl object-contain md:-mt-16 md:max-w-3xl lg:max-w-4xl xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-5xl {isProjectPage
			? 'md:-translate-x-1/2'
			: ''}"
	/>
</div>
