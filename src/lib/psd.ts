import { readPsd } from 'ag-psd';
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
			container.style.width = `${psd.width}px`;
			container.style.height = `${psd.height}px`;
			psd.children?.forEach((layer) => {
				if (layer.canvas === undefined || layer.hidden) return;
				const clean = new Image();
				clean.title = String(layer.name);
				clean.style.position = 'absolute';
				clean.style.top = `${layer.top}px`;
				clean.style.bottom = `${layer.bottom}px`;
				clean.style.left = `${layer.left}px`;
				clean.style.right = `${layer.right}px`;
				clean.style.opacity = `${layer.opacity}`;
				clean.style.mixBlendMode = `${layer.blendMode}`;
				clean.src = layer.canvas.toDataURL();
				clean.classList.add('animated', 'layers');
				container.appendChild(clean);
			});
		},
		false
	);
	xhr.send();
	return container;
};

export const followMouseAnimation = (active: boolean) => {
	if (active === false) return;
	waitForElement('.animated').then(() => {
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
