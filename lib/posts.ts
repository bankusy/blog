import { createClient } from '@supabase/supabase-js';
import matter from 'gray-matter';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Post {
    slug: string;
    frontmatter: {
        title: string;
        description: string;
        published: string;
        category?: string;
        sourceUrl?: string;
        coverImage?: string;
        [key: string]: any;
    };
    content: string;
}

export async function getAllPosts(): Promise<Post[]> {
    if (!supabaseUrl || !supabaseKey) {
        console.error('Supabase credentials missing');
        return [];
    }

    const { data: summaries, error } = await supabase
        .from('news_summaries')
        .select('*, news(url)');

    if (error || !summaries) {
        console.error('Error fetching posts from Supabase:', error);
        return [];
    }

    const posts = summaries.map((summary) => {
        try {
            // Frontmatter parsing
            const { data, content } = matter(summary.blog_content);

            // Validating minimal frontmatter
            if (!data.title) {
                // Fallback if title missing in frontmatter
                data.title = "Untitled Post";
            }
            if (!data.published) {
                // Try fetching from joined news if needed, but for now fallback to today
                // Ideally join query should strictly fetch this, assuming migration was successful.
            }

            // Inject sourceUrl from joined news table if not present in frontmatter
            // Note: 'news' property comes from the join query.
            // Using 'any' cast or interface update would be cleaner, but simple check works.
            if (!data.sourceUrl && (summary as any).news && (summary as any).news.url) {
                data.sourceUrl = (summary as any).news.url;
            }

            return {
                slug: summary.slug || summary.id, // Prefer slug from DB, fallback to UUID
                frontmatter: data as Post['frontmatter'],
                content,
            };
        } catch (e) {
            console.error(`Error parsing post content for slug: ${summary.slug || summary.id}`, e);
            return null;
        }
    })
        .filter((post): post is Post => post !== null)
        .filter(post => post.slug !== 'finding-and-fixing-ghosttys-largest-memory-leak') // TODO: Fix content errors in this post
        .sort((a, b) => {
            const dateA = new Date(a.frontmatter.published);
            const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();

            const dateB = new Date(b.frontmatter.published);
            const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();

            return timeB - timeA;
        });

    return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    if (!supabaseUrl || !supabaseKey) {
        return null;
    }

    const { data: summary, error } = await supabase
        .from('news_summaries')
        .select('*, news(url)')
        .eq('slug', slug)
        .single();

    if (error || !summary) {
        // console.error(`Post not found: ${slug}`, error);
        return null;
    }

    try {
        const { data, content } = matter(summary.blog_content);

        // Inject sourceUrl
        if (!data.sourceUrl && (summary as any).news && (summary as any).news.url) {
            data.sourceUrl = (summary as any).news.url;
        }

        return {
            slug: summary.slug || summary.id,
            frontmatter: data as Post['frontmatter'],
            content,
        };
    } catch (e) {
        return null;
    }
}
