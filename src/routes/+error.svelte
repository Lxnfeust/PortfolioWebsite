<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col gap-10 text-center">
	<h1 class="font-diolce text-4.5xl leading-[85%] uppercase">Erreur {page.status}</h1>
	<p class="mt-6 text-xl leading-[105%]">
		{#if page.status === 404}
			Il semblerait que la page que vous cherchez n'existe pas. <br />
			Vous pouvez retourner à l'accueil en cliquant sur le bouton ci-dessous.
		{:else}
			Une erreur inattendue est survenue.
		{/if}
	</p>
	<a	
		href="/"
		class="mt-8 inline-block text-xl leading-[105%] font-medium uppercase underline underline-offset-4"
	>
		Retour à l'accueil
	</a>
</div>