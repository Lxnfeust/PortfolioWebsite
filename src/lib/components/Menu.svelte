<script lang="ts">
	let { showMenu = $bindable() } = $props();

	const navItems = [
		{ number: 'A', name: 'Accueil', href: '/' },
		{ number: 'B', name: 'Projets', href: '/projects' },
		{ number: 'C', name: 'Laboratoire', href: '/laboratory' },
		{ number: 'D', name: 'À propos de moi', href: '/about-me' }
	];
</script>

<div
	class:translate-y-0={showMenu}
	class="fixed top-0 right-0 z-60 flex w-full max-w-120 -translate-y-full flex-col gap-10 bg-white px-8 pt-6 pb-8 text-theme-black transition duration-400"
>
	<button
		onclick={() => (showMenu = !showMenu)}
		class="cursor-pointer self-end text-xl leading-[105%] font-medium uppercase underline underline-offset-4"
		>Fermer</button
	>
	<div class="flex justify-between border-y border-theme-black py-4">
		<span class="leading-[105%] font-bold uppercase">Mattéo</span>
		<span class="leading-[105%] font-bold uppercase">Lambert</span>
	</div>
	<div class="flex flex-col gap-16">
		<nav>
			<ul class="flex flex-col gap-4">
				{#each navItems as navItem, i (i)}
					<li>
						<a href={navItem.href} class="flex items-end gap-1"
							><span class="text-xl font-medium">{navItem.number}.</span><span
								class="font-amiri text-4.5xl leading-[85%] uppercase italic">{navItem.name}</span
							></a
						>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="flex flex-col gap-6">
			<p class="leading-[105%] font-bold">
				Disons simplement qu’un beau jour, j’ai pris la décision d’ouvrir Photoshop, et voilà où
				j’en suis aujourd’hui. Bonjour, moi c’est Mattéo, et voici mon portfolio.
			</p>
			<p class="leading-[105%]">
				Mon histoire est bien évidemment remplie de beaucoup plus de détails incroyables. <br />
				Si vous êtes curieux.se, je serais ravi de pouvoir en discuter avec vous :)
			</p>
		</div>
	</div>
	<div class="flex justify-between border-y border-theme-black py-4">
		<span class="leading-[105%] font-bold uppercase">Mail</span>
		<span class="leading-[105%] font-bold uppercase">CV</span>
	</div>
</div>
