export async function load({fetch}) {
    const resp = await fetch("/api/courses");

    const courses = (resp.ok && await resp.json()) || [];
    return {courses};
} 