import { writable } from 'svelte/store';

export const view = writable('list');
export const value = writable("");
export const dna = writable(428);

export const filter_tags = writable([
    {
        name: "Best Seller",
        color: "secondary",
        selected: false
    },
    {
        name: "New!",
        color: "success",
        selected: false
    }
]);

export const viewing = writable({})
