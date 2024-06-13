function findChildrenStr(obj) {  // TODO: unit test and/or different method
    if (typeof obj === 'string') {
        return obj;
    } else if (Array.isArray(obj)) {
        return obj.map(x => findChildrenStr(x)).join("");
    } else if (!obj) {
        return '';
    } else if (obj.key.startsWith('code-')) {
        return obj.props.children;
    } else if (obj.key.startsWith('span-')) {
        return findChildrenStr(obj.props.children);
    }
    return '';
}

export function convertToId(heading) {
    const headingStr = findChildrenStr(heading);
    // Convert text to lowercase
    let id = headingStr.toLowerCase();
    // Replace spaces with hyphens
    id = id.replace(/\s+/g, '-');
    // Remove any non-alphanumeric characters except hyphens
    id = id.replace(/[^a-z0-9-]/g, '');
    return id;
}
