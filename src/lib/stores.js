import { writable } from 'svelte/store';

export const view = writable('list');
export const value = writable('');
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

function createUser(){
    
    const { subscribe, set, update } = writable({});
    return {
        subscribe,
        update,
        set: (val) => {
            set(val)
            fetch(`http://localhost:5173/api/user/${val._id}`, {
                method: 'PUT',
                body: JSON.stringify(val)
            })
        },
    }

}

export const user = createUser()
