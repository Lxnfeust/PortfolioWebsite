<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let gsap;
	let Draggable;
	let InertiaPlugin;

	const containerId = 'imageContainer';
	const containerSelector = '#' + containerId;
	const headerHeight = 72;

	const imgURLArray = [
		'/images/laboratory/genshin.png',
		'/images/laboratory/humanoid.png',
		'/images/laboratory/kernel.jpg',
		'/images/laboratory/nuances.png',
		'/images/laboratory/sample.jpg',
		'/images/laboratory/spike.png',
		'/images/laboratory/t-shirt.jpg'
	];

	// --- Réglages ajustables ---
	const CELL_SIZE = 560; // taille de la cellule virtuelle (grille invisible, sert au calcul de zone visible)
	const BUFFER_CELLS = 1; // marge de cellules préchargées au-delà du viewport
	const OCCUPANCY = 0.7; // proportion de cellules occupées (0-1) → contrôle la densité / les vides
	const JITTER_FACTOR = 0.85; // rayon de dispersion d'une image autour du centre de sa cellule (relatif à CELL_SIZE)
	const DEPTH_OPACITY_MIN = 0.75; // opacité mini simulant la profondeur (axe Z)
	// ---------------------------

	let sizeMinPx = 140;
	let sizeMaxPx = 420;

	let aspectRatios = [];
	let mountedElements = new Map();
	let lastRangeKey = '';
	let maskElem;
	let draggables = [];

	function hash(n) {
		const s = Math.sin(n) * 43758.5453123;
		return s - Math.floor(s);
	}

	function cellSeed(cx, cy) {
		return cx * 92821.7 + cy * 68917.3;
	}

	function getCell(cx, cy) {
		const seed = cellSeed(cx, cy);

		if (hash(seed * 1.7 + 11) > OCCUPANCY) return null;

		const imgIndex = Math.floor(hash(seed * 2.3 + 23) * imgURLArray.length) % imgURLArray.length;
		const rSize = hash(seed * 3.1 + 37);
		const rJitterX = hash(seed * 4.7 + 53);
		const rJitterY = hash(seed * 5.9 + 71);
		const rDepth = hash(seed * 6.3 + 89);

		const width = sizeMinPx + rSize * (sizeMaxPx - sizeMinPx);
		const ratio = aspectRatios[imgIndex] || 1;
		const height = width / ratio;

		const jitterRange = CELL_SIZE * JITTER_FACTOR;
		const worldX = cx * CELL_SIZE + CELL_SIZE / 2 + (rJitterX * 2 - 1) * jitterRange;
		const worldY = cy * CELL_SIZE + CELL_SIZE / 2 + (rJitterY * 2 - 1) * jitterRange;

		return {
			key: `${cx}:${cy}`,
			src: imgURLArray[imgIndex],
			width,
			height,
			worldX,
			worldY,
			opacity: DEPTH_OPACITY_MIN + rDepth * (1 - DEPTH_OPACITY_MIN)
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
		el.style.pointerEvents = 'none';
		document.querySelector(containerSelector).appendChild(el);
		mountedElements.set(cell.key, el);
	}

	function updateVisibleCells(force = false) {
		const tx = gsap.getProperty(containerSelector, 'x');
		const ty = gsap.getProperty(containerSelector, 'y');

		const viewLeft = -tx - CELL_SIZE * BUFFER_CELLS;
		const viewTop = -ty - CELL_SIZE * BUFFER_CELLS;
		const viewRight = -tx + innerWidth + CELL_SIZE * BUFFER_CELLS;
		const viewBottom = -ty + innerHeight + CELL_SIZE * BUFFER_CELLS;

		const cxMin = Math.floor(viewLeft / CELL_SIZE);
		const cxMax = Math.floor(viewRight / CELL_SIZE);
		const cyMin = Math.floor(viewTop / CELL_SIZE);
		const cyMax = Math.floor(viewBottom / CELL_SIZE);

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

		for (const [key, el] of mountedElements) {
			if (!neededKeys.has(key)) {
				el.remove();
				mountedElements.delete(key);
			}
		}
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
			imgURLArray.map(
				(src) =>
					new Promise((resolve) => {
						const img = new Image();
						img.onload = () => resolve(img.naturalWidth / img.naturalHeight || 1);
						img.onerror = () => resolve(1);
						img.src = src;
					})
			)
		).then((ratios) => {
			aspectRatios = ratios;
		});
	}

	function resize() {
		sizeMinPx = Math.max(90, innerWidth * 0.08);
		sizeMaxPx = Math.min(640, innerWidth * 0.3);

		gsap.set(containerSelector, { x: 0, y: 0 });

		for (const el of mountedElements.values()) el.remove();
		mountedElements.clear();
		lastRangeKey = '';

		updateVisibleCells(true);
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

	function createDraggable() {
		return Draggable.create(containerSelector, {
			trigger: '.mask',
			dragResistance: 0.4,
			resistance: 400,
			inertia: true,
			onDrag: () => updateVisibleCells(),
			onThrowUpdate: () => updateVisibleCells()
		});
	}

	function setStyles() {
		gsap.set('body', { overflow: 'hidden' });
	}

	async function init() {
		await loadAspectRatios();

		gsap.set(containerSelector, { willChange: 'transform', x: 0, y: 0 });

		createMask();
		setStyles();
		updateVisibleCells(true);

		draggables = createDraggable();

		window.addEventListener('resize', resize);
	}

	function cleanup() {
		if (!browser) return;
		window.removeEventListener('resize', resize);
		draggables.forEach((draggable) => draggable.kill());
		draggables = [];
		for (const el of mountedElements.values()) el.remove();
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

<!--
<div class="pointer-events-none fixed inset-0 -z-1 flex items-center justify-center gap-3">
	<hr class="h-px w-8 bg-theme-black" />
	<div class="flex flex-col items-center gap-4">
		<hr class="h-8 w-px bg-theme-black" />
		<span class="text-xl leading-[105%] font-medium text-theme-black uppercase" aria-hidden="true">
			Scroll
		</span>
		<hr class="h-8 w-px bg-theme-black" />
	</div>
	<hr class="h-px w-8 bg-theme-black" />
</div>
-->
<div id="imageContainer"></div>
<div class="mask" bind:this={maskElem}></div>