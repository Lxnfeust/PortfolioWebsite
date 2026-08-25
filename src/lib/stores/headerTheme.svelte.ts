class HeaderThemeStore {
	theme = $state<'light' | 'dark'>('light');

	#observer: IntersectionObserver | null = null;
	#resizeHandler: (() => void) | null = null;

	init(headerEl: HTMLElement) {
		if (typeof window === 'undefined') return () => {};

		const build = () => {
			this.#observer?.disconnect();

			const headerHeight = headerEl.offsetHeight;
			const lineTop = headerHeight;
			const lineBottom = Math.max(window.innerHeight - headerHeight - 1, 0);

			// On recalcule à chaque fois qu'un élément data-theme="dark"
			// entre ou sort de la fine ligne de déclenchement (hauteur du header).
			this.#observer = new IntersectionObserver(
				() => {
					const dark = Array.from(document.querySelectorAll<HTMLElement>('[data-theme="dark"]')).some(
						(el) => {
							const rect = el.getBoundingClientRect();
							return rect.top <= lineTop && rect.bottom >= lineTop;
						}
					);
					this.theme = dark ? 'dark' : 'light';
				},
				{
					rootMargin: `-${lineTop}px 0px -${lineBottom}px 0px`,
					threshold: 0
				}
			);

			document
				.querySelectorAll('[data-theme="dark"]')
				.forEach((el) => this.#observer!.observe(el));
		};

		build();
		this.#resizeHandler = build;
		window.addEventListener('resize', this.#resizeHandler);

		return () => {
			if (this.#resizeHandler) window.removeEventListener('resize', this.#resizeHandler);
			this.#observer?.disconnect();
			this.#observer = null;
		};
	}
}

export const headerTheme = new HeaderThemeStore();