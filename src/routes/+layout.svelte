<script lang="ts">
	import Menu from '$lib/components/Menu.svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let showMenu: boolean = $state(false);

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex h-full flex-col">
	<header class="header">
		<div class="header_item">
			<div class="credits">
				<span class="text-xl leading-[105%] font-medium">Mattéo Lambert</span>
				<span class="text-xl leading-[105%] font-medium">Portfolio</span>
			</div>
		</div>
		<div class="header_item">
			<div class="lang_selector">
				<span class="text-xl leading-[105%] font-medium">LANG :&nbsp;</span>
				<div class="lang">
					<span class="text-xl leading-[105%] font-medium">FR</span>
					<span class="text-xl leading-[105%] font-medium">&nbsp;/&nbsp;</span>
					<span class="text-xl leading-[105%] font-medium">EN</span>
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
	</header>
	<main class="mt-18 h-full max-h-[calc(100vh-72px)] grow">
		{@render children()}
	</main>
</div>
<div
	class="pointer-events-none fixed inset-0 z-50 h-full w-full bg-theme-black-opacity transition duration-400"
	class:bg-theme-black-opacity={!showMenu}
></div>

<div class="fixed inset-0 -z-1 flex h-full w-full items-center justify-center">
	<img src="/images/emboss_star.png" alt="" class="w-full max-w-3xl object-contain" />
</div>
