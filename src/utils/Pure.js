import { onDestroy } from 'svelte'

export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

export function onInterval(callback, milliseconds) {
    const interval = setInterval(callback, milliseconds);
    onDestroy(interval);
}

