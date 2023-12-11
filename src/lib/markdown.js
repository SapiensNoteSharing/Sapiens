import MarkdownIt from "markdown-it";
import texMath from 'markdown-it-texmath'
import katex from "katex";
import { markdownItTable } from "markdown-it-table"
import hl from 'highlight.js'
import { File } from '$lib/mongodb'
import Rating from '$lib/components/Rating.svelte'

const md2 = new MarkdownIt({
    breaks: true,
    typographer: true,
    highlight: (str, lang) => {
        if (lang && hl.getLanguage(lang)) {
            try {
                return hl.highlight(str, { language: lang }).value
            } catch (err) {}
        }
        return ''
    }
})
.use(texMath, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: {
        output: 'mathml'
    }
})
.use(markdownItTable)

const md = new MarkdownIt({
        breaks: true,
        typographer: true,
        highlight: (str, lang) => {
            if (lang && hl.getLanguage(lang)) {
                try {
                    return hl.highlight(str, { language: lang }).value
                } catch (err) {}
            } else {
                try {
                    let rendered = md2.render(str)
                    return `<pre class="no-language"><code>` + rendered + '</code></pre>'
                } catch(err) {
                    console.log(err)
                }
            }
            return ''
        }
    })
    .use(texMath, {
        engine: katex,
        delimiters: 'dollars',
        katexOptions: {
            output: 'mathml'
        }
    })
    .use(markdownItTable)

export async function render(data) {

    let errors = data.match(/(?<!!)\[\[(.*)\]\]/gi) || [];

    for(let error of errors){ //image tag mistakenly written
        data = data.replace(error, `!${error}`)
    }
    // images

    let images = data.match(/!\[\[(.*)\]\]/gi) || [];

    data = md.render(data) 

    for (let image of images) {
        let img = image.substring(3, image.length - 2).split("|");
        let src = img[0]?.replace(/\.(?=[a-z]).*/, '');
        let size = "1000";
        if (img.length == 2)
            size = img[1];

        const imgtag = await File.findOne({ name: src });
        if(imgtag){
            data = data.replace(image, `<center><img src="data:image/png;base64,${imgtag.content}" alt=${imgtag.name} width=${size}></center>`);
        }
    }

    //place components

    return data;
}