import { writable } from 'svelte/store';

export let view = writable('list');
export let value = writable("");
export let dna = writable(428);
export let filter_tags = writable([
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
