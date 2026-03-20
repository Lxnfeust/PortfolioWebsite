<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let showMenu: boolean = $state(false);

	let { children } = $props();
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
	
	<!-- <header class="header">
		<div class="header_item">
			<div class="credits">
				<span class="text-xl leading-[105%] font-medium uppercase">Mattéo Lambert</span>
				<span class="text-xl leading-[105%] font-medium uppercase">Portfolio</span>
			</div>
		</div>
		<div class="header_item flex w-full items-center justify-between md:w-[25vw]">
			<div class="lang_selector">
				<span class="hidden text-xl leading-[105%] font-medium md:block">LANG :&nbsp;</span>
				<div class="lang">
					<span class="text-xl leading-[105%] font-medium uppercase">FR</span>
					<span class="text-xl leading-[105%] font-medium uppercase">&nbsp;/&nbsp;</span>
					<span class="text-xl leading-[105%] font-medium uppercase">EN</span>
				</div>
			</div>
			<div class="menu">
				<button
					onclick={() => (showMenu = !showMenu)}
					class="cursor-pointer text-xl leading-[105%] font-medium uppercase underline underline-offset-4"
					>Menu</button
				>
				<Menu bind:showMenu />
			</div>
		</div>
	</header> -->
	
	<main class="mt-18 h-full max-h-[calc(100vh-72px)] grow">
		{@render children()}
	</main>
</div>


<div class="fixed inset-0 -z-1 flex h-full w-full items-center justify-center">
	<img src="/images/emboss_star.png" alt="" class="w-full max-w-3xl object-contain" />
</div>
