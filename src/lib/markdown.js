import MarkdownIt from "markdown-it";
import texMath from 'markdown-it-texmath'
import katex from "katex";
import fs from 'fs'
import { File } from './mongodb'

const md = new MarkdownIt({html: true}).use(texMath, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: {
        output: 'mathml',
        displayMode: false
    }
})

function convert(file){
    return Buffer.from(file.content, 'base64').toString('utf-8');
}

export async function render(file){
    let data = convert(file)
    data.replace('0x0a', '<br/>')
    /*
    let splitted = data.split('$') //katex inline expressions
    for(let i = 0; i < splitted.length; i++){
        if(i % 2 == 0){
            let images = splitted[i].split(/!\[\[(.*)\]\]/)
            for(let j = 0; j < images.length; j++){
                if(j % 2 == 0){
                    images[j] = md.render(images[j])
                } else {
                    const image = await File.findOne({name: images[j]})
                    images[j] = `<img src="data:image/png;base64,${docs.content}" alt=${image.name}>`
                }
            }
            splitted[i] = images.join('')
        } else {
            splitted[i] = katex.renderToString(splitted[i])
        }
    }
    console.log(splitted.join(''))
    return splitted.join('')
    */
   return md.render(data)
}