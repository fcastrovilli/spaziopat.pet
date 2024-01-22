<script lang="ts">
	import { followMouseAnimation, loadPsd } from '$lib/psd';
	import { onMount } from 'svelte';
	import { PUBLIC_CURRENT_PSD } from '$env/static/public';
	import type { Layer } from 'ag-psd';
	let container: HTMLDivElement;
	let animate: boolean = false;
	let layers: Layer[] = [];
	$: layers;

	onMount(async () => {
		await loadPsd(PUBLIC_CURRENT_PSD, container);
		animate = true;
		followMouseAnimation(animate);
	});
</script>

<!-- svelte-ignore a11y-missing-content -->
<a
	style="cursor: url(/img/telegram-logo.svg),auto;"
	href="https://t.me/spaziopat"
	target="_blank"
	class="z-50 absolute top-0 left-0 w-full h-full"
></a>
<div class="absolute top-0 left-0 h-screen w-screen flex justify-center items-center p-4">
	<div class="w-full sm:w-auto sm:h-full aspect-square max-h-full">
		<div class="h-full w-full" bind:this={container}></div>
	</div>
</div>
