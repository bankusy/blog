import Link from 'next/link';
import { Post } from '@/lib/posts';
import { format } from 'date-fns';

export default function BlogCard({ post }: { post: Post }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block">
            <article className="flex flex-col space-y-2 py-8 border-b border-[var(--border-color)] group-hover:opacity-70 transition-opacity">
                <div className="flex items-center gap-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                    <span>{post.frontmatter.category}</span>
                    <span>•</span>
                    <time dateTime={post.frontmatter.published}>
                        {format(new Date(post.frontmatter.published), 'MMMM d, yyyy')}
                    </time>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                    {post.frontmatter.title}
                </h2>
                <p className="text-[var(--text-secondary)] text-base leading-relaxed line-clamp-2">
                    {post.frontmatter.description}
                </p>
            </article>
        </Link>
    )
}
