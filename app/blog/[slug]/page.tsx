import { getPostBySlug, getAllPosts } from '@/lib/posts';
import Navigation from '@/components/Navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';

// Markdown components logic
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Metadata } from 'next';
import { extractHeadings } from '@/lib/toc';
import TableOfContents from '@/components/TableOfContents';
import Newsletter from '@/components/Newsletter';

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            type: 'article',
            publishedTime: post.frontmatter.published,
            url: `/blog/${slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.frontmatter.title,
            description: post.frontmatter.description,
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const headings = extractHeadings(post.content);

    const options = {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                rehypeHighlight,
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'wrap' }]
            ],
        },
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            <Navigation />

            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Content */}
                <main className="lg:col-span-8 lg:col-start-2 overflow-hidden">
                    <Link href="/" className="group inline-flex items-center text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-10 transition-colors">
                        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to home
                    </Link>

                    <article>
                        <header className="mb-14">
                            <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)] mb-6 font-medium uppercase tracking-wide">
                                <time dateTime={post.frontmatter.published}>
                                    {format(new Date(post.frontmatter.published), 'MMMM d, yyyy')}
                                </time>
                                <span>•</span>
                                <span className="text-[var(--text-primary)]">{post.frontmatter.category}</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 text-[var(--text-primary)] leading-tight">
                                {post.frontmatter.title}
                            </h1>
                            <div className="text-xl text-[var(--text-secondary)] leading-relaxed">
                                {post.frontmatter.description}
                            </div>
                        </header>

                        <hr className="border-[var(--border-color)] mb-12" />

                        <div className="prose prose-lg dark:prose-invert max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-[var(--text-primary)]
                            prose-headings:scroll-mt-24
                            prose-p:text-[var(--text-secondary)] prose-p:leading-8
                            prose-a:text-[var(--text-primary)] prose-a:underline prose-a:decoration-[var(--border-color)] prose-a:underline-offset-4 hover:prose-a:decoration-[var(--text-primary)] prose-a:transition-all
                            prose-strong:text-[var(--text-primary)]
                            prose-code:text-[var(--text-primary)] prose-code:bg-[var(--bg-secondary)] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-normal
                            prose-pre:bg-[var(--bg-secondary)] prose-pre:border prose-pre:border-[var(--border-color)]
                            prose-li:text-[var(--text-secondary)]
                            prose-blockquote:border-l-[var(--text-primary)] prose-blockquote:text-[var(--text-primary)] prose-blockquote:font-medium prose-blockquote:italic
                          ">
                            {/* @ts-ignore - types conflict specifically with rehype plugins sometimes */}
                            <MDXRemote source={post.content} options={options} />
                        </div>
                    </article>
                </main>

                {/* Sidebar / TOC */}
                <aside className="hidden lg:col-span-3 lg:block relative">
                    <TableOfContents headings={headings} />
                </aside>
            </div>

            <Newsletter />

            <footer className="border-t border-[var(--border-color)] mt-0 py-12 text-center">
                <p className="text-sm text-[var(--text-secondary)]">
                    &copy; {new Date().getFullYear()} Bankusy.
                </p>
            </footer>
        </div>
    );
}
