import { readable } from 'svelte/store';

export const mousePosition = readable({ x: 0, y: 0 }, (set) => {
	document.body.addEventListener('mousemove', move);

	function move(event: { clientX: number; clientY: number }) {
		set({
			x: event.clientX,
			y: event.clientY
		});
	}

	return () => {
		document.body.removeEventListener('mousemove', move);
	};
});
