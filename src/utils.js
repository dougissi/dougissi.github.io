export function convertToId(heading) {
    // Convert text to lowercase
    let id = heading.toLowerCase();
    // Replace spaces with hyphens
    id = id.replace(/\s+/g, '-');
    // Remove any non-alphanumeric characters except hyphens
    id = id.replace(/[^a-z0-9-]/g, '');
    return id;
}
