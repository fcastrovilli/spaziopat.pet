<script lang="ts">
	import { loadPsd, followMouseAnimation } from '$lib/psd';
	import { onDestroy, onMount } from 'svelte';
	import { PUBLIC_CURRENT_PSD } from '$env/static/public';
	let container: HTMLDivElement;
	let animate: boolean = false;
	onMount(async () => {
		await loadPsd(PUBLIC_CURRENT_PSD, container);
		animate = true;
		followMouseAnimation(animate);
	});
	onDestroy(() => {
		animate = false;
	});
</script>

<div class="h-full w-full no-scrollbar md:flex md:items-center md:justify-center">
	<div
		bind:this={container}
		class="mt-32 md:-mt-32 absolute top-0 left-0 -translate-y-1/3 -translate-x-1/3 md:-translate-x-16 md:translate-y-0 lg:translate-x-0 lg:translate-y-0 md:relative scale-[0.3] md:scale-[0.50] lg:scale-[0.75] parent no-scrollbar"
	/>
</div>
