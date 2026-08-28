<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { dictionaries } from '$lib/i18n';

	const lang = $derived(page.params.lang);
	const t = $derived(dictionaries[lang]);

	let gsap;
	let Draggable;
	let InertiaPlugin;

	const containerId = 'imageContainer';
	const containerSelector = '#' + containerId;
	const headerHeight = 72;

	const imgList = [
		{ src: '/images/laboratory/genshin.png', name: 'Fate x Genshin', date: '2024' },
		{ src: '/images/laboratory/humanoid.png', name: 'Cyborg', date: '2024' },
		{ src: '/images/laboratory/kernel.jpg', name: 'Kernel', date: '2025' },
		{ src: '/images/laboratory/nuances.png', name: 'Colors', date: '2023' },
		{ src: '/images/laboratory/sample.jpg', name: 'Sample', date: '2024' },
		{ src: '/images/laboratory/spike.png', name: 'Spike', date: '2024' },
		{ src: '/images/laboratory/t-shirt.jpg', name: 'Today’s t-shirt', date: '2024' }
	];

	// --- Réglages ajustables, par breakpoint ---
	const BREAKPOINT_MOBILE = 768;
	const BUFFER_CELLS = 1;
	const DEPTH_OPACITY_MIN = 1;

	function getConfig() {
		const isMobile = window.innerWidth < BREAKPOINT_MOBILE;
		return isMobile
			? {
					cellSize: 280,
					occupancy: 0.72,
					jitterFactor: 0.75,
					baseSizeVw: 0.38,
					baseSizeMinPx: 90,
					baseSizeMaxPx: 220,
					scaleMin: 0.6,
					scaleMax: 0.9,
					parallaxMin: 0.7,
					parallaxMax: 1.2
				}
			: {
					cellSize: 560,
					occupancy: 0.7,
					jitterFactor: 0.85,
					baseSizeVw: 0.16,
					baseSizeMinPx: 90,
					baseSizeMaxPx: 420,
					scaleMin: 0.5,
					scaleMax: 0.8,
					parallaxMin: 0.55,
					parallaxMax: 1.35
				};
	}
	// ---------------------------------------------

	let config; // défini au premier calcul, dans onMount uniquement — jamais au niveau racine
	let baseSizePx = 200; // valeur initiale arbitraire, recalculée avant tout usage réel
	let aspectRatios = [];
	let mountedElements = new Map(); // key -> { el, depthFactor, imgIndex }
	let lastRangeKey = '';
	let maskElem;
	let draggables = [];

	let popupOpen = $state(false);
	let popupIndex = $state(0);
	let hasInteracted = $state(false);
	let isLoading = $state(true);

	function hashInt(x, y, salt) {
		let h = (x * 374761393 + y * 668265263 + salt * 2147483647) | 0;
		h = Math.imul(h ^ (h >>> 13), 1274126177);
		h = (h ^ (h >>> 16)) >>> 0;
		return h / 4294967295;
	}

	function getCell(cx, cy) {
		if (hashInt(cx, cy, 11) > config.occupancy) return null;

		const imgIndex = Math.floor(hashInt(cx, cy, 23) * imgList.length) % imgList.length;
		const rScale = hashInt(cx, cy, 37);
		const rJitterX = hashInt(cx, cy, 53);
		const rJitterY = hashInt(cx, cy, 71);
		const rDepth = hashInt(cx, cy, 89);

		const scale = config.scaleMin + rScale * (config.scaleMax - config.scaleMin);
		const width = baseSizePx * scale;
		const ratio = aspectRatios[imgIndex] || 1;
		const height = width / ratio;

		const jitterRange = config.cellSize * config.jitterFactor;
		const worldX = cx * config.cellSize + config.cellSize / 2 + (rJitterX * 2 - 1) * jitterRange;
		const worldY = cy * config.cellSize + config.cellSize / 2 + (rJitterY * 2 - 1) * jitterRange;

		return {
			key: `${cx}:${cy}`,
			src: imgList[imgIndex].src,
			imgIndex,
			width,
			height,
			worldX,
			worldY,
			opacity: DEPTH_OPACITY_MIN + rDepth * (1 - DEPTH_OPACITY_MIN),
			depthFactor: config.parallaxMin + rDepth * (config.parallaxMax - config.parallaxMin)
		};
	}

	function mountElement(cell) {
		const el = document.createElement('img');
		el.src = cell.src;
		el.alt = '';
		el.draggable = false;
		el.style.position = 'absolute';
		el.style.left = `${cell.worldX - cell.width / 2}px`;
		el.style.top = `${cell.worldY - cell.height / 2}px`;
		el.style.width = `${cell.width}px`;
		el.style.height = `${cell.height}px`;
		el.style.opacity = cell.opacity;
		el.style.borderRadius = '4px';
		el.style.cursor = 'pointer';
		document.querySelector(containerSelector).appendChild(el);
		mountedElements.set(cell.key, { el, depthFactor: cell.depthFactor, imgIndex: cell.imgIndex });
	}

	function applyParallax(tx, ty) {
		for (const { el, depthFactor } of mountedElements.values()) {
			const offsetX = tx * (depthFactor - 1);
			const offsetY = ty * (depthFactor - 1);
			el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
		}
	}

	function updateVisibleCells(force, tx, ty) {
		const maxDepthDeviation = Math.max(config.parallaxMax - 1, 1 - config.parallaxMin);
		const dynamicBufferX = Math.abs(tx) * maxDepthDeviation;
		const dynamicBufferY = Math.abs(ty) * maxDepthDeviation;

		const viewLeft = -tx - config.cellSize * BUFFER_CELLS - dynamicBufferX;
		const viewTop = -ty - config.cellSize * BUFFER_CELLS - dynamicBufferY;
		const viewRight = -tx + innerWidth + config.cellSize * BUFFER_CELLS + dynamicBufferX;
		const viewBottom = -ty + innerHeight + config.cellSize * BUFFER_CELLS + dynamicBufferY;

		const cxMin = Math.floor(viewLeft / config.cellSize);
		const cxMax = Math.floor(viewRight / config.cellSize);
		const cyMin = Math.floor(viewTop / config.cellSize);
		const cyMax = Math.floor(viewBottom / config.cellSize);

		const rangeKey = `${cxMin}:${cxMax}:${cyMin}:${cyMax}`;
		if (!force && rangeKey === lastRangeKey) return;
		lastRangeKey = rangeKey;

		const neededKeys = new Set();

		for (let cy = cyMin; cy <= cyMax; cy++) {
			for (let cx = cxMin; cx <= cxMax; cx++) {
				const cell = getCell(cx, cy);
				if (!cell) continue;
				neededKeys.add(cell.key);
				if (!mountedElements.has(cell.key)) {
					mountElement(cell);
				}
			}
		}

		for (const [key, { el }] of mountedElements) {
			if (!neededKeys.has(key)) {
				el.remove();
				mountedElements.delete(key);
			}
		}
	}

	function onDragTick() {
		const tx = gsap.getProperty(containerSelector, 'x');
		const ty = gsap.getProperty(containerSelector, 'y');
		updateVisibleCells(false, tx, ty);
		applyParallax(tx, ty);
	}

	function updateMaskBounds() {
		if (!maskElem) return;
		gsap.set(maskElem, {
			top: headerHeight,
			height: Math.max(innerHeight - headerHeight, 0)
		});
	}

	function loadAspectRatios() {
		return Promise.all(
			imgList.map(
				(item) =>
					new Promise((resolve) => {
						const img = new Image();
						img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 1);
						img.onerror = () => resolve(1);
						img.src = item.src;
					})
			)
		).then((ratios) => {
			aspectRatios = ratios;
		});
	}

	function computeBaseSize() {
		config = getConfig();
		baseSizePx = Math.min(
			config.baseSizeMaxPx,
			Math.max(config.baseSizeMinPx, innerWidth * config.baseSizeVw)
		);
	}

	function resize() {
		computeBaseSize();

		gsap.set(containerSelector, { x: 0, y: 0 });

		for (const { el } of mountedElements.values()) el.remove();
		mountedElements.clear();
		lastRangeKey = '';

		updateVisibleCells(true, 0, 0);
		applyParallax(0, 0);
		updateMaskBounds();
	}

	function createMask() {
		gsap.set(maskElem, {
			position: 'fixed',
			left: 0,
			width: '100vw',
			zIndex: 40
		});
		updateMaskBounds();
	}

	function openPopup(imgIndex) {
		popupIndex = imgIndex;
		popupOpen = true;
	}

	function closePopup() {
		popupOpen = false;
	}

	function prevImage() {
		popupIndex = (popupIndex - 1 + imgList.length) % imgList.length;
	}

	function nextImage() {
		popupIndex = (popupIndex + 1) % imgList.length;
	}

	function handleTriggerClick(e) {
		const point = e.changedTouches ? e.changedTouches[0] : e;
		const elements = document.elementsFromPoint(point.clientX, point.clientY);
		const imgEl = elements.find((el) => el.tagName === 'IMG' && el.closest(containerSelector));
		if (!imgEl) return;
		const entry = [...mountedElements.entries()].find(([, data]) => data.el === imgEl);
		if (!entry) return;
		openPopup(entry[1].imgIndex);
	}

	function createDraggable() {
		return Draggable.create(containerSelector, {
			trigger: '.mask',
			dragResistance: 0.4,
			resistance: 400,
			inertia: true,
			onDrag: onDragTick,
			onThrowUpdate: onDragTick,
			onClick: handleTriggerClick,
			onDragStart: () => {
				hasInteracted = true;
			}
		});
	}

	function setStyles() {
		gsap.set('body', { overflow: 'hidden' });
	}

	async function init() {
		await loadAspectRatios();

		computeBaseSize();

		gsap.set(containerSelector, { willChange: 'transform', x: 0, y: 0 });

		createMask();
		setStyles();
		updateVisibleCells(true, 0, 0);
		applyParallax(0, 0);

		draggables = createDraggable();

		window.addEventListener('resize', resize);

		isLoading = false;
	}

	function cleanup() {
		if (!browser) return;
		window.removeEventListener('resize', resize);
		draggables.forEach((draggable) => draggable.kill());
		draggables = [];
		for (const { el } of mountedElements.values()) el.remove();
		mountedElements.clear();
		if (gsap) gsap.set('body', { clearProps: 'overflow' });
	}

	onMount(async () => {
		const gsapModule = await import('gsap');
		const draggablePkg = await import('gsap/Draggable');
		const inertiaPkg = await import('gsap/InertiaPlugin');

		gsap = gsapModule.gsap;
		Draggable = draggablePkg.Draggable;
		InertiaPlugin = inertiaPkg.InertiaPlugin;

		gsap.registerPlugin(Draggable, InertiaPlugin);

		init();
	});

	onDestroy(() => {
		cleanup();
	});
</script>

<div class="pointer-events-none fixed inset-0 -z-1 flex items-center justify-center">
	<div class="relative flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
		<svg viewBox="-160 -160 320 320" class="absolute inset-0 h-full w-full text-theme-black">
			<g class="explore-lines {hasInteracted ? 'explore-lines--hidden' : ''}">
				<line x1="-32" y1="-32" x2="-71" y2="-71" class="explore-line" />
				<line x1="32" y1="-32" x2="71" y2="-71" class="explore-line" />
				<line x1="-32" y1="32" x2="-71" y2="71" class="explore-line" />
				<line x1="32" y1="32" x2="71" y2="71" class="explore-line" />
			</g>
		</svg>
		<span
			class="font-diolce text-2xl uppercase italic text-theme-black transition-opacity duration-700 md:text-3xl {hasInteracted
				? 'opacity-0'
				: 'opacity-100'}"
		>
			{t.laboratory.explore}
		</span>
	</div>
</div>

<div class="fixed inset-0 overflow-hidden">
	<div id="imageContainer"></div>
</div>

<div class="mask" bind:this={maskElem}></div>

<div
	class="fixed inset-0 z-150 bg-theme-black-opacity transition-opacity duration-400"
	class:opacity-100={popupOpen}
	class:opacity-0={!popupOpen}
	class:pointer-events-none={!popupOpen}
	onclick={closePopup}
	role="presentation"
></div>

<div
	class:translate-y-0={popupOpen}
	class:translate-y-full={!popupOpen}
	class="fixed bottom-0 left-1/2 z-200 flex h-[70vh] w-full max-w-160 -translate-x-1/2 flex-col gap-6 bg-white px-8 pt-6 pb-8 text-theme-black transition duration-400"
>
	<div class="flex justify-between border-y border-theme-black py-4">
		<span class="leading-[105%] font-bold uppercase">{imgList[popupIndex].name}</span>
		<span class="leading-[105%] font-bold uppercase">{imgList[popupIndex].date}</span>
	</div>

	<div class="flex flex-1 items-center justify-center overflow-hidden">
		<img src={imgList[popupIndex].src} alt="" class="h-full w-full object-contain" />
	</div>

	<div class="flex justify-between border-y border-theme-black py-4">
		<button onclick={prevImage} class="cursor-pointer leading-[105%] font-bold uppercase">
			{t.laboratory.prev}
		</button>
		<button onclick={nextImage} class="cursor-pointer leading-[105%] font-bold uppercase">
			{t.laboratory.next}
		</button>
	</div>
</div>

<div
	class="fixed inset-0 z-300 flex items-center justify-center bg-theme-white transition-opacity duration-500 {isLoading
		? 'opacity-100'
		: 'pointer-events-none opacity-0'}"
>
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="loader-spin h-8 w-8 text-theme-black"
	>
		<path d="M12.5994 0L12.6394 5.42748C12.6403 5.5258 12.7197 5.6072 12.82 5.61002L15.2194 5.67738V6.87611L13.6243 6.92004L14.8094 8.0397C14.882 8.10821 14.996 8.10669 15.0671 8.03677L18.0561 5.09656L18.9034 5.94485L15.9584 8.92898C15.8887 8.9996 15.8882 9.11274 15.9564 9.18474L17.0702 10.361L17.1151 8.76889H18.3148L18.3822 11.181C18.3849 11.2794 18.4653 11.3598 18.5657 11.3606L24 11.4006V12.5994L18.5657 12.6394C18.4653 12.6402 18.3849 12.7206 18.3822 12.819L18.3148 15.2311H17.1151L17.0702 13.6448L15.8519 14.9324C15.8419 14.9431 15.8426 14.96 15.8529 14.9705L18.8976 18.0561L18.9034 18.063L18.0561 18.9113L18.02 18.8751L14.9597 15.8646C14.9488 15.8539 14.9309 15.8531 14.9197 15.8637L13.6321 17.079L15.2194 17.1239V18.3226L12.82 18.39C12.7197 18.3928 12.6403 18.4742 12.6394 18.5725L12.5994 24H11.4006L11.3606 18.5725C11.3597 18.4742 11.2803 18.3928 11.18 18.39L8.78061 18.3226V17.1239L10.3434 17.08L9.16619 15.9681C9.09367 15.8996 8.97962 15.9002 8.90848 15.9701L5.92044 18.9113L5.07215 18.063L8.01725 15.0778C8.08671 15.0073 8.08807 14.895 8.02017 14.8231L6.92785 13.6692L6.88489 15.2311H5.68519L5.61783 12.819C5.61507 12.7206 5.53469 12.6402 5.43431 12.6394L0 12.5994V11.4006L5.43431 11.3606C5.53468 11.3598 5.61507 11.2794 5.61783 11.181L5.68519 8.76889H6.88489L6.92785 10.3366L8.02017 9.18474C8.08827 9.11273 8.08689 8.99957 8.01725 8.92898L5.07215 5.94485L5.92044 5.09656L8.90848 8.03677C8.97958 8.10673 9.0936 8.10814 9.16619 8.0397L10.3513 6.92004L8.78061 6.87611V5.67738L11.18 5.61002C11.2803 5.6072 11.3597 5.5258 11.3606 5.42748L11.4006 0H12.5994ZM12.6394 16.873C12.6401 16.9715 12.7196 17.0537 12.82 17.0565L13.3969 17.0722L12.6677 16.342L13.9963 14.9392C14.0063 14.9286 14.0056 14.9116 13.9953 14.9012L12.614 13.5013L12.6394 16.873ZM10.0867 14.7938C10.0173 14.8643 10.0161 14.9766 10.0838 15.0486L11.3079 16.342L10.5768 17.0731L11.18 17.0565C11.2804 17.0537 11.3599 16.9715 11.3606 16.873L11.385 13.4769L10.0867 14.7938ZM14.8885 14.008C14.8994 14.0185 14.9174 14.0184 14.9285 14.008L16.3332 12.6814L17.0643 13.4125L17.0478 12.819C17.045 12.7206 16.9646 12.6403 16.8642 12.6394L13.4721 12.614L14.8885 14.008ZM7.13577 12.6394C7.0354 12.6402 6.95501 12.7206 6.95225 12.819L6.93565 13.3891L7.64337 12.6814L8.93777 13.9045C9.01031 13.9727 9.12443 13.9713 9.19548 13.9016L10.5026 12.614L7.13577 12.6394ZM9.19548 10.1062C9.12439 10.0363 9.01035 10.0349 8.93777 10.1033L7.64337 11.3264L6.93565 10.6177L6.95225 11.181C6.95501 11.2794 7.0354 11.3598 7.13577 11.3606L10.4948 11.385L9.19548 10.1062ZM15.0388 10.1033C14.9662 10.0348 14.8512 10.0362 14.7801 10.1062L13.4799 11.385L16.8642 11.3606C16.9646 11.3597 17.045 11.2794 17.0478 11.181L17.0634 10.5933L16.3332 11.3264L15.0388 10.1033ZM11.3079 7.66583L10.0838 8.95827C10.0157 9.03028 10.0171 9.14343 10.0867 9.21402L11.385 10.5299L11.3606 7.12698C11.3599 7.02848 11.2804 6.94628 11.18 6.94346L10.5689 6.92589L11.3079 7.66583ZM12.82 6.94346C12.7196 6.94628 12.6401 7.02848 12.6394 7.12698L12.614 10.5055L13.8889 9.21402C13.9586 9.14341 13.96 9.03028 13.8918 8.95827L12.6677 7.66583L13.4047 6.92687L12.82 6.94346Z" fill="currentColor"/>
	</svg>
</div>

<style>
	.explore-lines {
		transition: opacity 0.7s ease;
	}

	.explore-lines--hidden {
		opacity: 0;
	}

	.explore-line {
		stroke: currentColor;
		stroke-width: 1.5;
		stroke-dasharray: 55;
		stroke-dashoffset: 55;
		opacity: 0;
		animation: explore-draw 2.4s ease-in-out infinite;
	}

	@keyframes explore-draw {
		0% {
			stroke-dashoffset: 55;
			opacity: 0;
		}
		15% {
			opacity: 1;
		}
		85% {
			stroke-dashoffset: 0;
			opacity: 1;
		}
		100% {
			stroke-dashoffset: 0;
			opacity: 0;
		}
	}

	.loader-spin {
		animation: loader-spin 1s linear infinite;
		transform-origin: center;
	}

	@keyframes loader-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>