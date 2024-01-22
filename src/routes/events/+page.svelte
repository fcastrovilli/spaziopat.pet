<script lang="ts">
	export let data;
	const { events } = data;
	import Event from '$lib/components/event.svelte';
</script>

<div class="p-4 w-full flex justify-center items-center">
	<div class="grid grid-cols-1 gap-4">
		{#each events as event}
			<Event {event} />
		{/each}
	</div>
</div>
