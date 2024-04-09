import { writable } from 'svelte/store';

export const view = writable('list');
export const filters = writable({});
export const dna = writable(428);
export const viewing = writable({})
export const user = writable({})
