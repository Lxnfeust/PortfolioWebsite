<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { Draggable } from 'gsap/Draggable';
	import { InertiaPlugin } from 'gsap/InertiaPlugin';

	console.clear();

	gsap.registerPlugin(Draggable, InertiaPlugin);

	function moveArrayIndex(array, oldIndex, newIndex) {
		if (newIndex >= array.length) {
			newIndex = array.length - 1;
		}
		array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
		return array;
	}

	function checkPositions(elem) {
		let rowIndex = -1,
			imgIndex = -1;
		imgRep.forEach((row, i) => {
			row.forEach((img, j) => {
				if (elem.isSameNode(img)) {
					rowIndex = i;
					imgIndex = j;
				}
			});
		});

		if (rowIndex === -1) return;

		if (rowIndex < rowMidIndex) {
			for (let i = rowIndex; i < rowMidIndex; i++) {
				let rowY = gsap.getProperty(rowArray[0], 'y');

				if (rowArray.length % 2 === 1) {
					let row = rowArray[rowArray.length - 1];
					if (row.dataset.offset === 'true') {
						gsap.set(row, { y: rowY - gutter - boxHeight, x: '+=' + boxWidth / 2 });
						row.dataset.offset = 'false';
					} else {
						gsap.set(row, { y: rowY - gutter - boxHeight, x: '-=' + boxWidth / 2 });
						row.dataset.offset = 'true';
					}
				} else {
					gsap.set(rowArray[rowArray.length - 1], { y: rowY - gutter - boxHeight });
				}

				moveArrayIndex(imgRep, imgRep.length - 1, 0);
				moveArrayIndex(rowArray, rowArray.length - 1, 0);
			}
		} else if (rowIndex > rowMidIndex) {
			for (let i = rowMidIndex; i < rowIndex; i++) {
				let rowY = gsap.getProperty(rowArray[rowArray.length - 1], 'y');

				if (rowArray.length % 2 === 1) {
					let row = rowArray[0];
					if (row.dataset.offset === 'true') {
						gsap.set(row, { y: rowY + gutter + boxHeight, x: '-=' + boxWidth / 2 });
						row.dataset.offset = 'false';
					} else {
						gsap.set(row, { y: rowY + gutter + boxHeight, x: '+=' + boxWidth / 2 });
						row.dataset.offset = 'true';
					}
				} else {
					gsap.set(rowArray[0], { y: rowY + gutter + boxHeight });
				}

				moveArrayIndex(imgRep, 0, imgRep.length - 1);
				moveArrayIndex(rowArray, 0, rowArray.length - 1);
			}
		}

		if (imgIndex < imgMidIndex) {
			for (let rowNum = 0; rowNum < rows.length; rowNum++) {
				let row = imgRep[rowNum];

				for (let i = imgIndex; i < imgMidIndex; i++) {
					let imgX = gsap.getProperty(row[0], 'x');

					gsap.set(row[row.length - 1], { x: imgX - gutter - boxWidth });

					moveArrayIndex(row, row.length - 1, 0);
				}
			}
		} else if (imgIndex > imgMidIndex) {
			for (let rowNum = 0; rowNum < rows.length; rowNum++) {
				let row = imgRep[rowNum];

				for (let i = imgMidIndex; i < imgIndex; i++) {
					let imgX = gsap.getProperty(row[renderImgNum - 1], 'x');

					gsap.set(row[0], { x: imgX + gutter + boxWidth });

					moveArrayIndex(row, 0, row.length - 1);
				}
			}
		}
	}

	function centerGrid() {
		let bcr = lastCenteredElem.getBoundingClientRect();
		let midX = bcr.x + bcr.width / 2;
		let midY = bcr.y + bcr.height / 2;

		let x = winMidX - midX;
		let y = winMidY - midY;

		gsap.to(containerSelector, {
			ease: 'sine.inOut',
			duration: 0.7,
			x: '+=' + x,
			y: '+=' + y
		});
	}

	function updateCenterElem() {
		let elems = document.elementsFromPoint(winMidX, winMidY);
		elems.forEach((elem) => {
			if (elem.matches(imageSelector) && !lastCenteredElem.isSameNode(elem)) {
				lastCenteredElem = elem;

				checkPositions(lastCenteredElem);
			}
		});
	}

	const containerId = 'imageContainer';
	const containerSelector = '#' + containerId;
	const rowClass = 'row';
	const rowSelector = '.' + rowClass;
	const imageClass = 'sliderImage';
	const imageSelector = '.' + imageClass;
	const imageMediaClass = 'sliderImageMedia';
	const imageMediaSelector = '.' + imageMediaClass;
	const imgURLArray = [
		'/images/laboratory/genshin.png',
		'/images/laboratory/humanoid.png',
		'/images/laboratory/kernel.jpg',
		'/images/laboratory/nuances.png',
		'/images/laboratory/sample.jpg',
		'/images/laboratory/spike.png',
		'/images/laboratory/t-shirt.jpg'
	];
	const imgURLArrayLength = imgURLArray ? imgURLArray.length : -1;
	const visibleRowNum = 3;
	const visibleImgNum = 5;
	const renderRowNum = visibleRowNum + 5;
	const renderImgNum = visibleImgNum + 5;
	const headerHeight = 72;

	const useInertia = true;
	const useCenterGrid = true;

	let rows, imgMidIndex, rowMidIndex;
	const rowArray = [];
	const imgRep = [];

	let boxWidth,
		boxHeight,
		gutter,
		horizSpacing,
		vertSpacing,
		horizOffset,
		vertOffset,
		winMidX,
		winMidY,
		lastCenteredElem,
		maskElem,
		draggables = [];

	function updateMaskBounds() {
		if (!maskElem) return;
		gsap.set(maskElem, {
			top: headerHeight,
			height: Math.max(innerHeight - headerHeight, 0)
		});
	}

	function createImageGrid() {
		for (let y = 0; y < renderRowNum; y++) {
			let row = document.createElement('div');
			row.className = rowClass;
			for (let x = 0; x < renderImgNum; x++) {
				let image = document.createElement('div');
				let media = document.createElement('img');
				image.className = imageClass;
				media.className = imageMediaClass;
				media.src = imgURLArray[(y * renderImgNum + x) % imgURLArrayLength];
				media.alt = '';
				media.draggable = false;
				image.appendChild(media);
				row.appendChild(image);
			}
			document.querySelector(containerSelector).appendChild(row);

			imgRep.push(gsap.utils.toArray(row.querySelectorAll(imageSelector)));
		}

		((rows = document.querySelectorAll(rowSelector)),
			(imgMidIndex = Math.floor(renderImgNum / 2)),
			(rowMidIndex = Math.floor(renderRowNum / 2)));
	}

	function createMask() {
		maskElem = document.createElement('div');
		maskElem.className = 'mask';
		document.body.appendChild(maskElem);

		gsap.set(maskElem, {
			position: 'fixed',
			left: 0,
			width: '100vw',
			zIndex: 40
		});

		updateMaskBounds();
	}

	function resize() {
		const viewportHeight = Math.max(innerHeight - headerHeight, 0);

		winMidX = innerWidth / 2;
		winMidY = headerHeight + viewportHeight / 2;
		gutter = Math.max(innerWidth * 0.02, 12);
		boxWidth = (innerWidth - gutter * (visibleImgNum + 1)) / visibleImgNum;
		boxHeight = (viewportHeight - gutter * (visibleRowNum + 1)) / visibleRowNum;
		horizSpacing = boxWidth + gutter;
		vertSpacing = boxHeight + gutter;
		horizOffset = -(imgMidIndex * horizSpacing + boxWidth / 2) + winMidX;
		vertOffset = -(rowMidIndex * vertSpacing + boxHeight / 2) + winMidY;

		gsap.set(containerSelector, { x: 0, y: 0 });

		rows.forEach(function (row, i) {
			gsap.set(row, {
				attr: {
					'data-offset': function () {
						if (i % 2 === 0) return false;
						else return true;
					}
				},
				x: function () {
					if (i % 2 === 0) return horizOffset;
					else return horizOffset - boxWidth / 2;
				},
				y: function () {
					return i * vertSpacing + vertOffset;
				}
			});

			gsap.set(row.querySelectorAll(imageSelector), {
				width: boxWidth,
				height: boxHeight,
				x: function (index) {
					return index * horizSpacing;
				}
			});

			rowArray[i] = row;
		});

		updateMaskBounds();
	}

	function setStyles() {
		gsap.set('body', {
			overflow: 'hidden'
		});

		gsap.set(imageSelector, {
			position: 'absolute',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			top: 0,
			left: 0
		});

		gsap.set(imageMediaSelector, {
			width: '100%',
			height: '100%',
			maxWidth: '160px',
			maxHeight: '100%',
			objectFit: 'contain',
			pointerEvents: 'none'
		});

		gsap.set(rowSelector, {
			position: 'absolute'
		});
	}

	function createDraggable() {
		let options = {
			trigger: '.mask',
			dragResistance: 0.4,
			resistance: 400,
			onDrag: updateCenterElem
		};

		if (useInertia) {
			options.inertia = true;
			options.onThrowUpdate = updateCenterElem;

			if (useCenterGrid) {
				options.onThrowComplete = centerGrid;
			}
		} else if (useCenterGrid) {
			options.onDragEnd = centerGrid;
		}

		return Draggable.create(containerSelector, options);
	}

	function init() {
		gsap.set(containerSelector, { willChange: 'transform' });

		createImageGrid();
		createMask();
		lastCenteredElem =
			document.querySelectorAll(imageSelector)[rowMidIndex * renderImgNum + imgMidIndex];

		draggables = createDraggable();

		setStyles();

		resize();
		window.addEventListener('resize', resize);
	}

	onMount(() => {
		init();

		return () => {
			window.removeEventListener('resize', resize);
			draggables.forEach((draggable) => draggable.kill());
			draggables = [];
			if (maskElem) {
				maskElem.remove();
				maskElem = null;
			}
			gsap.set('body', { clearProps: 'overflow' });
		};
	});
</script>

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
<div id="imageContainer"></div>
