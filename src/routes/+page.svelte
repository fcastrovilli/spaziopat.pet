<script lang="ts">
	import { loadPsd, followAnimation } from '$lib/psd';
	import { onMount } from 'svelte';
	let container: HTMLDivElement;
	onMount(async () => {
		const res = await loadPsd('psd/lamby.psd', container);
		console.log(res.children);
		followAnimation();
	});
</script>

<div class="flex justify-center items-center">
	<div bind:this={container} class="parent w-full" />
</div>

<style>
	.parent {
		position: relative;
		margin: 0 auto;
		width: 100%;
		overflow: hidden;
	}
</style>
