import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();
    const baseUrl = 'https://bankusy.com';

    const postUrls = posts.map((post) => {
        let date = new Date(post.frontmatter.published);
        if (isNaN(date.getTime())) {
            // console.warn(`Invalid date for post: ${post.slug}, fallback to now`);
            date = new Date();
        }
        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: date,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        };
    });

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...postUrls,
    ];
}
