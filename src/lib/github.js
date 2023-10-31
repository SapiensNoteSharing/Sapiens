import { config } from '$lib/config';
import { Course, Directory, File, dropContents } from '$lib/mongodb';
import { error } from '@sveltejs/kit';
import { Octokit } from 'octokit';

const octokit = new Octokit({
    auth: config.git.access_token,
    baseUrl: 'https://api.github.com'
})

await octokit.auth()


const htmlMapping = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
    " ": "%20",
    "!": "%21",
    "#": "%23",
    "$": "%24",
    "%": "%25",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "*": "%2A",
    "+": "%2B",
    ",": "%2C",
    "-": "%2D",
    ".": "%2E",
    ":": "%3A",
    ";": "%3B",
    "=": "%3D",
    "?": "%3F",
    "@": "%40",
    "[": "%5B",
    "]": "%5D",
    "{": "%7B",
    "}": "%7D",
    "À": "%C3%80",
    "Á": "%C3%81",
    "È": "%C3%88",
    "É": "%C3%89",
    "Ì": "%C3%8C",
    "Í": "%C3%8D",
    "Ò": "%C3%92",
    "Ó": "%C3%93",
    "Ù": "%C3%99",
    "Ú": "%C3%9A",
    "à": "%C3%A0",
    "á": "%C3%A1",
    "è": "%C3%A8",
    "é": "%C3%A9",
    "ì": "%C3%AC",
    "í": "%C3%AD",
    "ò": "%C3%B2",
    "ó": "%C3%B3",
    "ù": "%C3%B9",
    "ú": "%C3%BA",
  }  

const options = {
    headers: {
        "Authorization": `Bearer ${config.git.access_token}`,
        "Accept": "application/vnd.github+json"
    }
}
const base = `https://api.github.com/repos/${config.git.owner}/${config.git.repo}/contents/${config.git.path}`
const urlSuffix = '?ref=main';


function substitute(href){
    return href.split('').map(char => {
        if(htmlMapping[char] != undefined) return htmlMapping[char];
        return char
    }).join('')
}

export async function gitFile(path){

    const resp = await fetch(`${base}${path}`, options)
    const file = (resp.ok && await resp.json()) || {};
}


export async function get(file){
    if(!file.gitUrl) throw error(500, 'File provided has not a gitUrl property')
    const resp = await fetch(`${base}${file.gitUrl}`, options)
    const body = (resp.ok && await resp.json()) || {}
    return body

}

export default octokit;
