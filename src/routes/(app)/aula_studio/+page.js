export async function load({ parent, fetch }) {
    const resp = await fetch('/admin/api/file');
    let file = (resp.ok && await resp.json())

    return {file};
}