import { readPsd } from 'ag-psd';
import { gsap } from 'gsap/dist/gsap';
import mousePosition from '$lib/mousePosition';
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
			container.style.objectFit = 'contain';
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
				clean.classList.add('animated');
				container.appendChild(clean);
			});
		},
		false
	);
	xhr.send();
	return container;
};

export const rotateAnimation = () => {
	waitForElement('.animated').then(() => {
		gsap.to('.animated', {
			duration: 10,
			ease: 'none',
			repeat: -1,
			rotation: 360
		});
	});
};
export const randomAnimation = () => {
	waitForElement('.animated').then(() => {
		gsap.to('.animated', {
			x: 'random(-35, 55)',
			y: 'random(-35, 55)',
			ease: 'power2.inOut',
			duration: 0.4,
			rotation: 360,
			repeat: -1,
			repeatRefresh: true
		});
	});
};
export const followAnimation = () => {
	waitForElement('.animated').then(() => {
		mousePosition.subscribe((value) => {
			const depth = 10;
			const moveX = value.x / depth;
			const moveY = value.y / depth;
			gsap.to('.animated', { duration: 1.6, ease: 'elastic', rotateX: moveX });
			gsap.to('.animated', { duration: 1.6, ease: 'elastic', rotateY: moveY });
			gsap.to('.animated', { duration: 1.6, ease: 'elastic', rotateZ: moveX });
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
