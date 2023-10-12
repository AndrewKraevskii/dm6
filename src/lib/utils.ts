import { cubicOut } from "svelte/easing"

export function shuffle<T>(arr: T[]) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function sample<T>(arr: T[], n: number, starting?: T[]): T[] {
    const res: T[] = starting || [];
    while (res.length < n) {
        const rand = Math.floor(Math.random() * arr.length);
        const element = arr[rand];

        if (res.includes(element)) continue;

        res.push(element);
    }
    return res;
}

let counter = 0;

export function uid() {
    return counter++;
}

export function crossfade() {
    const to_receive = new Map();
    const to_send = new Map();

    function crossfade(from_node: Element, node: Element) {
        const delay = 0;
        const duration = (d: number) => Math.sqrt(d) * 30;
        const easing = cubicOut;


        const from = from_node.getBoundingClientRect();
        const to = node.getBoundingClientRect();
        const dx = from.left - to.left;
        const dy = from.top - to.top;
        const dw = from.width / to.width;
        const dh = from.height / to.height;
        const d = Math.sqrt(dx * dx + dy * dy);

        const style = getComputedStyle(node);
        const transform = style.transform === 'none' ? '' : style.transform;
        const opacity = +style.opacity;

        return {
            delay,
            duration: duration,
            easing,
            css: (t: number, u: number) => `
				opacity: ${t * opacity};
				transform-origin: top left;
				transform: ${transform} translate(${u * dx}px,${u * dy}px) scale(${t + (1 - t) * dw}, ${t + (1 - t) * dh});
			`
        };
    }

    function transition(items: ClientRectMap, counterparts: ClientRectMap, intro: boolean) {
        return (node: Element, params: CrossfadeParams & { key: any }) => {
            items.set(params.key, node);

            return () => {
                if (counterparts.has(params.key)) {
                    const other_node = counterparts.get(params.key);
                    counterparts.delete(params.key);

                    return crossfade(other_node, node, params);
                }

                // if the node is disappearing altogether
                // (i.e. wasn't claimed by the other list)
                // then we need to supply an outro
                items.delete(params.key);
                return fallback && fallback(node, params, intro);
            };
        };
    }

    return [
        transition(to_send, to_receive, false),
        transition(to_receive, to_send, true)
    ];
}