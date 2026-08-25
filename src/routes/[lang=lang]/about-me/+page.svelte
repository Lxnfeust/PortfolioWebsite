<script lang="ts">
	import { page } from '$app/state';
	import { localizedHref } from '$lib/i18n';

	const lang = $derived(page.params.lang as 'fr' | 'en');
</script>

<div class="mx-8 flex h-full min-h-0 flex-1 flex-col gap-6">
	<div class="flex flex-col gap-6 pb-8">
		<div class="flex flex-col gap-6">
			<h1 class="flex font-diolce text-4.5xl leading-[85%] uppercase md:text-5xl xl:text-7.5xl">
				À propos de moi
			</h1>
			<div class="flex gap-2 text-xs font-medium uppercase">
				<a href={localizedHref(lang, '/')} class="leading-[105%]">Accueil</a>
				<span class="leading-[105%]">></span>
				<p class="leading-[105%]">À propos de moi</p>
			</div>
		</div>

		<div class="flex flex-col justify-center gap-20 lg:flex-row xl:h-[40vh] xl:gap-6">
			<div class="relative aspect-square h-85 w-full md:h-130 xl:h-full xl:w-80 2xl:w-100 xl:max-w-none">
				<img
					src="/images/about/image_about.jpg"
					alt="Photo de Mattéo Lambert"
					class="absolute inset-0 h-full w-full object-cover"
				/>
			</div>

			<div class="flex flex-1 flex-col justify-between xl:w-80 2xl:w-100 xl:flex-none">
				<div class="flex flex-col max-w-160 gap-6">
					<h2 class="text-3.5xl leading-[105%] font-medium uppercase">Hello !</h2>
					<p class="max-w-160 leading-[105%] xl:max-w-none">
						Moi c'est Mattéo et j’ai 22 ans. Je suis un designer pluridisciplinaire
						en quête de nouveaux moyens et techniques pour exprimer ma créativité. à travers le
						graphisme, le webdesign, la 3D, ou le motion design, je conçois des projets à l’allure
						d’expériences.
					</p>
					<p class="max-w-160 leading-[105%] xl:max-w-none">
						Je suis convaincu que l’essence même de la création réside dans son
						processus et qu’il faut traiter chaque étape avec le respect et le soin qu’elle mérite.
					</p>
				</div>
				<div class="flex flex-col max-w-160 gap-6">
					<hr class="border-theme-black" />
					<a
						href={`/assets/CV_MatteoLambert_${lang.toUpperCase()}.pdf`}
						target="_blank"
						rel="noopener noreferrer"
						class="self-start text-xl leading-[105%] font-medium uppercase"
					>
						Télécharger mon CV
					</a>
				</div>
			</div>
		</div>
	</div>
</div>