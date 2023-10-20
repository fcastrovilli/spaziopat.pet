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

<div class="flex justify-center items-center -my-20 w-screen">
	<div bind:this={container} class="parent w-full object-cover" />
</div>

<style>
	.parent {
		position: relative;
		margin: 0 auto;
		width: 100%;
		overflow: hidden;
	}
</style>
