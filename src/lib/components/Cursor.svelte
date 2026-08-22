<script lang="ts">
	import { onMount } from 'svelte';

	let cursorEl: HTMLDivElement;
	let isHovering = $state(false);

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			cursorEl.style.left = `${e.clientX}px`;
			cursorEl.style.top = `${e.clientY}px`;
			cursorEl.style.opacity = '1';
		};

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.closest('a, button, [data-cursor-hover]')) {
				isHovering = true;
			}
		};

		const handleMouseOut = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target.closest('a, button, [data-cursor-hover]')) {
				isHovering = false;
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseover', handleMouseOver);
		document.addEventListener('mouseout', handleMouseOut);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseover', handleMouseOver);
			document.removeEventListener('mouseout', handleMouseOut);
		};
	});
</script>

<div bind:this={cursorEl} class="cursor-dot" class:cursor-dot--hover={isHovering} aria-hidden="true"></div>