<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

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
					cellSize: 320,
					occupancy: 0.6,
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
			Explorez
		</span>
	</div>
</div>
<div id="imageContainer"></div>

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
			←&nbsp;précédent
		</button>
		<button onclick={nextImage} class="cursor-pointer leading-[105%] font-bold uppercase">
			suivant&nbsp;→
		</button>
	</div>
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
</style>