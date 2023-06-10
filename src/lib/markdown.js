import MarkdownIt from "markdown-it";
import texMath from 'markdown-it-texmath'
import katex from "katex";
import hl from 'highlight.js'

const md = new MarkdownIt({
    html: true,
    breaks: true,
    highlight: (str, lang) => {
        if(lang && hl.getLanguage(lang)){
            try {
                return hl.highlight(str, {language: lang}).value
            }catch(err) {}
        }
    }
})
.use(texMath, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: {
        output: 'mathml'
    }
})

export async function render(file){
    let data = Buffer.from(file.content, 'base64').toString('utf-8');
    /*
    data.replace('0x0a', '<br/>')           obsidian Newlines
    */
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