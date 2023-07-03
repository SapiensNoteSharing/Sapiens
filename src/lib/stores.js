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

export const courses = writable([
    {
        name: 'Geometria e algebra Lineare',
        CFU: '6',
        code: 'B003273',
        cdl_code: 'B047',
        cdl_name: 'Ingegneria Informatica',
        curriculum_code: 'E69',
        curriculum_name: 'Tecnico Scientifico',
        professors: ['Caterina Stoppato', 'Giorgio Ottaviani'],
        degree: "Triennale",
        year: "Primo anno",
        semester: "Primo semestre",
        tags: [],
        favourite: true,
        in_cart: true,
        owned: false,
        content: "",
        chapters: [
            {
                title: "1. Spazio euclideo e vettori",
                paragraphs: [
                    "1.1. I vettori",
                    "1.2. Sistemi di riferimento e coordinate",
                    "1.3. Le coordinate cartesiane",
                    "1.4. Prodotto vettoriale e prodotto misto",
                    "1.5. Rette e piani nello spazio",
                ],
            },
            {
                title: "2. Sistemi lineari",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "3. Algebra delle matrici",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "4. Spazi vettoriali e applicazioni lineari",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "5. Determinante",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "6. Autovalori e autovettori",
                paragraphs: [
                    "",
                ],
            }, 
            {
                title: "7. Spazi euclidei",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "8. Teorema spettrale e forme quadratiche",
                paragraphs: [
                    "",
                ],
            },
        ],
        rating: 5,
        reviews_number: 13,
        match: 0,
    },
    {
        name: 'Analisi Matematica I',
        CFU: '9',
        code: 'B019481',
        cdl_code: 'B047',
        cdl_name: 'Ingegneria Informatica',
        curriculum_code: 'E69',
        curriculum_name: 'Tecnico Scientifico',
        professors: ['Serena Matucci'],
        degree: "Triennale",
        year: "Primo anno",
        semester: "Primo semestre",
        tags: ["New!"],
        favourite: false,
        in_cart: false,
        owned: true,
        chapters: [
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            }, 
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
        ],
        rating: 3.5,
        reviews_number: 2,
        match: 0,
    },
    {
        name: 'Fisica I',
        CFU: '6',
        code: 'B006853',
        cdl_code: 'B047',
        cdl_name: 'Ingegneria Informatica',
        curriculum_code: 'E69',
        curriculum_name: 'Tecnico Scientifico',
        professors: ['Fabio Cinti'],
        degree: "Triennale",
        year: "Primo anno",
        semester: "Primo semestre",
        tags: ["New!", "Best Seller"],
        favourite: true,
        in_cart: false,
        owned: true,
        chapters: [
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            }, 
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
        ],
        rating: 2,
        reviews_number: 9,
        match: 0,
    },
    {
        name: 'Fondamenti di Informatica',
        CFU: '9',
        code: 'B024280',
        cdl_code: 'B047',
        cdl_name: 'Ingegneria Informatica',
        curriculum_code: 'E69',
        curriculum_name: 'Tecnico Scientifico',
        professors: ['Stefano Berretti'],
        degree: "Triennale",
        year: "Primo anno",
        semester: "Primo semestre",
        tags: ["Best Seller"],
        favourite: false,
        in_cart: false,
        owned: false,
        chapters: [
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            }, 
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
            {
                title: "",
                paragraphs: [
                    "",
                ],
            },
        ],
        rating: 4,
        reviews_number: 5,
        match: 0,
    }
]);
