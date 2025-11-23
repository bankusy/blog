import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
    slug: string;
    frontmatter: {
        title: string;
        description: string;
        published: string;
        category: string;
        coverImage?: string;
        [key: string]: any;
    };
    content: string;
}

export function getAllPosts(): Post[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const postFolders = fs.readdirSync(postsDirectory);

    const posts = postFolders
        .filter(folder => !folder.startsWith('.') && fs.statSync(path.join(postsDirectory, folder)).isDirectory())
        .map((folder) => {
            try {
                // Support [folder]/[folder].mdx structure
                const filePath = path.join(postsDirectory, folder, `${folder}.mdx`);

                if (!fs.existsSync(filePath)) {
                    return null;
                }

                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { data, content } = matter(fileContent);

                return {
                    slug: folder,
                    frontmatter: data as Post['frontmatter'],
                    content,
                };
            } catch (e) {
                console.error(`Error reading post ${folder}:`, e);
                return null;
            }
        })
        .filter((post): post is Post => post !== null)
        .sort((a, b) => {
            return new Date(b.frontmatter.published).getTime() - new Date(a.frontmatter.published).getTime();
        });

    return posts;
}

export function getPostBySlug(slug: string): Post | null {
    try {
        const filePath = path.join(postsDirectory, slug, `${slug}.mdx`);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
            slug,
            frontmatter: data as Post['frontmatter'],
            content,
        };
    } catch (e) {
        return null;
    }
}
