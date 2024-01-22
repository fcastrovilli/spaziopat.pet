<script lang="ts">
	import type { public_event } from '$lib/types';

	export let event: public_event;
</script>

<!-- <pre>{JSON.stringify(event, null, '  ')}</pre> -->

<div
	class="max-w-3xl rounded-lg border bg-card text-card-foreground shadow-sm grid sm:grid-cols-2 grid-cols-1 gap-4"
>
	<div class="w-full h-full">
		<img src="/img/patpat.jpg" alt="Placeholder" class="w-full h-full object-cover aspect-square" />
	</div>
	<div class="space-y-4 p-4">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="whitespace-nowrap tracking-tight text-2xl font-bold">Card Title</h3>
			<p class="text-sm text-gray-500 dark:text-gray-400">Subtitle</p>
		</div>
		<div class="p-6">
			<p class="text-sm leading-relaxed">
				This is a description of the card. It provides more detailed information about the content
				of the card.
			</p>
		</div>
		<div class="items-center p-6 flex flex-col gap-2 min-[400px]:flex-row">
			<button
				class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm text-white font-medium bg-black h-10 px-4 py-2"
			>
				More
			</button>
		</div>
	</div>
</div>
