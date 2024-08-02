const colors = {
    primary: '#9de3c4',
    primary_shade: '#f5fcfb',
    secondary: '#ff3666',
    secondary_shade: '#eeedf7'
}

export let tagsPalette = {
    'Best Seller': colors.secondary,
    'New!': colors.primary
}

export function updateTagsColors(tags){
    tagsPalette = Object.keys(tags).reduce((obj, tagKey) => {obj[tags[tagKey].label] = tags[tagKey].color; return obj}, {})
}

export default colors;