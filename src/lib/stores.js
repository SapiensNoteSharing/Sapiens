import { writable } from 'svelte/store';
import { sorting_methods } from './utils';

export const view = writable('list');
export const filters = writable({
    sorting_method: {}
});
export const dna = writable(428);
export const viewing = writable({})
export const user = writable({})
