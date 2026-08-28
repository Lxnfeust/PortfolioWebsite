<script lang="ts">
	import { page } from '$app/state';
	import { localizedHref, dictionaries } from '$lib/i18n';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	const lang = $derived(page.params.lang as 'fr' | 'en');
	const t = $derived(dictionaries[lang]);

	const books = [
		{
			src: '/images/about/bibliotheque/Book1_ThreeDimensional.jpg',
			title: 'Three Dimensional',
			categoryKey: 'design3d' as const
		},
		{
			src: '/images/about/bibliotheque/Book2_NewUtilitarian.jpg',
			title: 'New Utilitarian',
			categoryKey: 'brandingDesign' as const
		},
		{
			src: '/images/about/bibliotheque/Book3_Fantastique.jpg',
			title: 'Fantastique',
			categoryKey: 'artHistory' as const
		},
		{
			src: '/images/about/bibliotheque/Book4_Chimera.jpg',
			title: 'Chimera',
			categoryKey: 'artbook' as const
		},
		{
			src: '/images/about/bibliotheque/Book5_TypographyForScreen.jpg',
			title: 'Typography for screen',
			categoryKey: 'motionDesign' as const
		}
	];

	// --- Réglages ajustables ---
	const BOOK_STEP_RATIO = 0.62; // espacement entre livres, relatif à leur hauteur → contrôle le chevauchement
	const BOOK_SCALE_FALLOFF = 0.16; // vitesse à laquelle un livre rapetisse en s'éloignant du centre
	const BOOK_MIN_SCALE = 0.55; // taille mini d'un livre très éloigné du centre
	const BOOK_RENDER_RANGE = 2; // nombre de livres affichés de chaque côté du centre → 5 au total
	// ---------------------------

	let bookGsap;
	let bookDraggable;
	let dragProxyEl;
	let carouselViewportEl;

	let dragX = $state(0);
	let bookBaseHeight = $state(260); // valeur de repli avant le premier calcul réel (client-only)

	const bookStepPx = $derived(bookBaseHeight * BOOK_STEP_RATIO);

	const renderSlots = $derived.by(() => {
		const centerVirtual = -dragX / bookStepPx;
		const centerRounded = Math.round(centerVirtual);
		const slots = [];

		for (let k = -BOOK_RENDER_RANGE; k <= BOOK_RENDER_RANGE; k++) {
			const virtualIndex = centerRounded + k;
			const distance = virtualIndex - centerVirtual;
			const bookIndex = ((virtualIndex % books.length) + books.length) % books.length;
			const scale = Math.max(BOOK_MIN_SCALE, 1 - BOOK_SCALE_FALLOFF * Math.abs(distance));
			const x = distance * bookStepPx;
			const z = Math.round(1000 - Math.abs(distance) * 50);

			slots.push({
				key: virtualIndex,
				src: books[bookIndex].src,
				alt: books[bookIndex].title,
				x,
				scale,
				z
			});
		}
		return slots;
	});

	const centerBookIndex = $derived.by(() => {
		const centerRounded = Math.round(-dragX / bookStepPx);
		return ((centerRounded % books.length) + books.length) % books.length;
	});

	function computeBookBaseHeight() {
		if (innerWidth < 640) return 200;
		if (innerWidth < 1280) return 260;
		if (innerWidth < 1536) return 220; // xl à 2xl : réduit pour ne pas empiéter sur le texte
		return 320; // 2xl et plus
	}

	function updateDragX() {
		dragX = bookGsap.getProperty(dragProxyEl, 'x');
	}

	function handleBookResize() {
		bookBaseHeight = computeBookBaseHeight();
	}

	async function initBookCarousel() {
		const gsapModule = await import('gsap');
		const draggablePkg = await import('gsap/Draggable');
		const inertiaPkg = await import('gsap/InertiaPlugin');

		bookGsap = gsapModule.gsap;
		const { Draggable } = draggablePkg;
		const { InertiaPlugin } = inertiaPkg;

		bookGsap.registerPlugin(Draggable, InertiaPlugin);
		bookGsap.set(dragProxyEl, { x: 0 });

		bookBaseHeight = computeBookBaseHeight();

		bookDraggable = Draggable.create(dragProxyEl, {
			type: 'x',
			trigger: carouselViewportEl,
			inertia: true,
			snap: (value) => Math.round(value / bookStepPx) * bookStepPx,
			onDrag: updateDragX,
			onThrowUpdate: updateDragX,
			onPress: () => {
				document.documentElement.style.overscrollBehavior = 'contain';
			},
			onRelease: () => {
				document.documentElement.style.overscrollBehavior = '';
			}
		})[0];

		window.addEventListener('resize', handleBookResize);
	}

	function cleanupBookCarousel() {
		if (!browser) return;
		window.removeEventListener('resize', handleBookResize);
		if (bookDraggable) bookDraggable.kill();
	}

	onMount(() => {
		initBookCarousel();
	});

	onDestroy(() => {
		cleanupBookCarousel();
	});
</script>

<div class="px-6 pb-6 pt-8 flex h-full min-h-0 flex-1 flex-col gap-[30vh]">
	<div class="flex flex-col gap-6 pb-8">
		<div class="flex flex-col gap-6">
			<h1 class="flex font-diolce text-4.5xl leading-[85%] uppercase md:text-5xl xl:text-7.5xl">
				{t.nav.aboutMe}
			</h1>
			<!--
			<div class="flex gap-2 text-xs font-medium uppercase">
				<a href={localizedHref(lang, '/')} class="leading-[105%]">{t.nav.home}</a>
				<span class="leading-[105%]">></span>
				<p class="leading-[105%]">{t.nav.aboutMe}</p>
			</div>
			-->
		</div>

		<div class="flex flex-col justify-center gap-20 lg:gap-6 lg:flex-row lg:items-top lg:h-[40vh] xl:h-[50vh] ">
			<div
				class="relative mx-auto aspect-square h-[50vh] w-full md:max-w-105 md:h-[50vh] lg:mx-0 lg:h-auto lg:w-80 lg:max-w-none xl:h-full xl:w-80 xl:max-w-none 2xl:w-100"
			>
				<img
					src="/images/about/image_about.jpg"
					alt="Photo de Mattéo Lambert"
					class="absolute inset-0 h-full w-full rounded object-cover"
				/>
			</div>

			<div class="flex flex-1 flex-col gap-16 mx-auto md:max-w-105 lg:mx-0 lg:justify-between lg:w-80 lg:flex-none xl:w-80 xl:h-full xl:flex-none xl:gap-0 2xl:w-100">
				<div class="flex max-w-160 flex-col gap-6">
					<h2 class="text-2xl xl:text-3.5xl leading-[105%] font-medium uppercase">{t.about.helloTitle}</h2>
					<p class="max-w-160 leading-[105%] xl:max-w-none">
						{t.about.helloParagraph1}
					</p>
					<p class="max-w-160 leading-[105%] xl:max-w-none">
						{t.about.helloParagraph2}
					</p>
				</div>
				<div class="flex max-w-160 flex-col gap-6">
					<hr class="hidden border-theme-black lg:block" />
					<a
						href={`/assets/CV_MatteoLambert_${lang.toUpperCase()}.pdf`}
						target="_blank"
						rel="noopener noreferrer"
						class="self-start text-base leading-[105%] font-medium uppercase md:text-xl"
					>
						{t.about.downloadCv}
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-8 pb-16">
		<hr class="border-theme-black" />
		<h2 class="text-2xl xl:text-3.5xl leading-[105%] font-medium uppercase">{t.about.libraryTitle}</h2>

		<div class="flex flex-col gap-10 xl:flex-row xl:items-center xl:gap-16">
			<div class="flex flex-col gap-4 xl:w-80 xl:shrink-0">
				<p class="leading-[105%]">
					{t.about.libraryText}
				</p>
			</div>

			<div class="flex flex-1 flex-col gap-6">
				<div
					class="relative left-1/2 right-1/2 w-screen -mx-[50vw] overflow-x-clip xl:static xl:left-auto xl:right-auto xl:w-auto xl:mx-0"
				>
					<div
						bind:this={carouselViewportEl}
						class="relative isolate mx-auto h-52 w-full cursor-grab select-none active:cursor-grabbing sm:h-64 md:h-80 xl:h-96"
					>
						{#each renderSlots as slot (slot.key)}
							<img
								src={slot.src}
								alt={slot.alt}
								draggable="false"
								style="position:absolute; top:0; left:50%; height:100%; width:auto; z-index:{slot.z}; -webkit-user-drag:none; transform: translate(calc(-50% + {slot.x}px), 0) scale({slot.scale});"
								class="rounded object-contain shadow-lg"
							/>
						{/each}
					</div>
				</div>
				<div class="flex h-16 flex-col items-center justify-center overflow-hidden text-center md:h-20">
					<p class="text-xl leading-[105%] font-medium uppercase">{books[centerBookIndex].title}</p>
					<p class="leading-[105%] opacity-70">{t.about.bookCategories[books[centerBookIndex].categoryKey]}</p>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="hidden" bind:this={dragProxyEl}></div>