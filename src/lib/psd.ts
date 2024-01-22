import { readPsd, type Layer } from 'ag-psd';

//@ts-expect-error - no types
import { gsap } from 'gsap/dist/gsap';
import { mousePosition } from '$lib/stores';

export const loadPsd = async (url: string, container: HTMLDivElement) => {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'arraybuffer';

	xhr.addEventListener(
		'load',
		function () {
			const buffer = xhr.response;
			const psd = readPsd(buffer);

			psd.children?.forEach((layer) => {
				if (layer.canvas === undefined || layer.hidden) return;

				const scaledWidth = (layer.canvas.width * container.clientWidth) / psd.width;
				const scaledHeight = (layer.canvas.height * container.clientHeight) / psd.height;

				const scaledTop = (Number(layer.top) * container.clientHeight) / psd.height;
				const scaledLeft = (Number(layer.left) * container.clientWidth) / psd.width;

				layer.canvas.style.position = 'absolute';
				layer.canvas.style.width = `${scaledWidth}px`;
				layer.canvas.style.height = `${scaledHeight}px`;

				const translateX = scaledLeft;
				const translateY = scaledTop;

				layer.canvas.style.transform = `translate(${translateX}px, ${translateY}px)`;

				layer.canvas.style.opacity = `${layer.opacity}`;
				layer.canvas.style.mixBlendMode = `${layer.blendMode}`;

				layer.canvas.classList.add('animated', 'layers');

				container.appendChild(layer.canvas);
			});
		},
		false
	);

	xhr.send();
	return container;
};

export const getPsdLayers = (url: string): Promise<Layer[]> => {
	return new Promise((resolve, reject) => {
		const layers: Layer[] = [];
		const xhr = new XMLHttpRequest();

		xhr.open('GET', url, true);
		xhr.responseType = 'arraybuffer';

		xhr.addEventListener('load', function () {
			const buffer = xhr.response;
			const psd = readPsd(buffer);

			if (!psd.canvas) {
				reject('Failed to load PSD.');
				return;
			}

			psd.children?.forEach((layer) => {
				if (layer.canvas === undefined || layer.hidden) return;
				layers.push(layer);
			});

			resolve(layers);
		});

		xhr.addEventListener('error', function () {
			reject('Error loading PSD.');
		});

		xhr.send();
	});
};

export const followMouseAnimation = (active: boolean) => {
	if (active === false) return;
	waitForElement('.animated').then(() => {
		gsap.from('.animated', {
			rotation: 360,
			x: '100vw',
			xPercent: -100,
			ease: 'elastic',
			duration: 1,
			yoyo: true
		});
		mousePosition.subscribe((value) => {
			const depth = 10;
			const moveX = value.x / depth;
			const moveY = value.y / depth;
			gsap.to('.animated', { duration: 1.6, ease: 'elastic', rotateX: moveX });
			gsap.to('.animated', { duration: 1.6, ease: 'elastic', rotateY: moveY });
			gsap.to('.animated', { duration: 1.6, ease: 'elastic', rotateZ: (moveX + moveY) / -2 });
		});
	});
};

export const waitForElement = (selector: string) => {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}
		const observer = new MutationObserver(() => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});
		observer.observe(document.body, {
			subtree: true,
			childList: true
		});
	});
};
