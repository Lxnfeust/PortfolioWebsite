<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex flex-col h-full">
	<header class="header">
			<div class="header_item">
				<div class="credits">
					<span>Mattéo Lambert</span>
					<span>Portfolio</span>
				</div>
			</div>
			<div class="header_item">
				<div class="lang_selector">
					<span>LANG :&nbsp;</span>
					<div class="lang">
						<span>FR</span>
						<span>&nbsp;/&nbsp;</span>
						<span>EN</span>
					</div>
				</div>
				<div class="menu">
					<span>MENU</span>
				</div>
			</div>
		</header>
	<main class="grow" >
	{@render children()}
	</main>

</div>