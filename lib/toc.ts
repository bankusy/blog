export interface Heading {
    id: string;
    text: string;
    level: number;
}

export function extractHeadings(content: string): Heading[] {
    // Simple regex to extract headings from markdown
    const regex = /^(#{1,6})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        // rehype-slug generates ids by kebab-casing the text
        // We need to mimic that behavior or simple replacing: invalid chars with nothing, spaces with -
        // Note: This matches default github-slugger/rehype-slug behavior roughly
        const id = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        headings.push({ level, text, id });
    }

    return headings;
}
