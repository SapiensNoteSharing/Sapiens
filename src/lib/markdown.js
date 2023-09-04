import MarkdownIt from "markdown-it";
import texMath from 'markdown-it-texmath'
import katex from "katex";
import markdownTable from "markdown-it-multimd-table"
import hl from 'highlight.js'
import { File } from '$lib/mongodb'

const md = new MarkdownIt({
        html: true,
        breaks: true,
        highlight: (str, lang) => {
            if (lang && hl.getLanguage(lang)) {
                try {
                    return hl.highlight(str, { language: lang }).value
                } catch (err) {}
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
    .use(markdownTable)

export async function render(file) {
    let data = Buffer.from(file.content, 'base64').toString('utf-8');
    // obsidian Newlines
    data.replace('0x0a', '<br/>');

    // images
    let images = data.match(/!\[\[(.*)\]\]/gi);

    for (let image of images) {
        let img = image.substring(3, image.length - 2).split("|");
        let src = img[0];
        let size = "1000";
        if (img.length == 2)
            size = img[1];

        const imgtag = await File.findOne({ name: src });
        data = data.replace(image, `<img src="data:image/png;base64,${imgtag.content}" alt=${imgtag.name} width=${size}>`);
    }

    return md.render(data);
}