<script lang="ts">
	import { page } from '$app/state';
	import { localizedHref, dictionaries } from '$lib/i18n';

	let { showMenu = $bindable() } = $props();

	const lang = $derived((page.params.lang as 'fr' | 'en' | undefined) ?? 'fr');
	const t = $derived(dictionaries[lang]);

	const navItems = [
		{ key: 'home' as const, path: '/' },
		{ key: 'projects' as const, path: '/projects' },
		{ key: 'laboratory' as const, path: '/playground' },
		{ key: 'aboutMe' as const, path: '/about-me' }
	];
</script>

<div
	class:translate-y-0={showMenu}
	class="fixed top-0 right-0 z-200 flex w-full max-w-120 -translate-y-full flex-col gap-10 bg-white px-8 pt-6 pb-8 text-theme-black transition duration-400"
>
	<button
		onclick={() => (showMenu = !showMenu)}
		class="cursor-pointer self-end text-base xl:text-xl leading-[105%] font-medium uppercase"
		>{t.menu.close}</button
	>
	<div class="flex justify-between border-y border-theme-black py-4">
		<span class="leading-[105%] font-medium uppercase text-base xl:text-xl">Mattéo</span>
		<span class="leading-[105%] font-medium uppercase text-base xl:text-xl">Lambert</span>
	</div>
	<div class="flex flex-col gap-16">
		<nav>
			<ul class="flex flex-col gap-2 md:gap-4">
				{#each navItems as navItem, i (i)}
					<li>
						<a
							href={localizedHref(lang, navItem.path)}
							onclick={() => (showMenu = false)}
							class="flex items-end gap-2"
						>
							<span class="translate-x-0 font-diolce text-[2.25rem] leading-[85%] uppercase transition duration-400 hover:translate-x-2 md:text-4.5xl"
								>{t.nav[navItem.key]}</span
							>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="flex flex-col gap-6">
			<p class="leading-[105%] font-medium">
				{t.menu.bioParagraph1}
			</p>
			<p class="leading-[105%]">{t.menu.bioParagraph2}</p>
		</div>
	</div>
	<div class="flex justify-between border-y border-theme-black py-4">
		<span class="text-base leading-[105%] font-medium uppercase md:text-xl">{t.menu.mail}</span>
		<a
			href={`/assets/CV_MatteoLambert_${lang.toUpperCase()}.pdf`}
			target="_blank"
			rel="noopener noreferrer"
			class="cursor-pointer text-base leading-[105%] font-medium uppercase md:text-xl"
		>
			{t.menu.cv}
		</a>
	</div>
</div>