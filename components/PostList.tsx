"use client"

import { useState, useMemo } from 'react';
import { Post } from '@/lib/posts';
import BlogCard from './BlogCard';
import { Search } from 'lucide-react';

export default function PostList({ posts }: { posts: Post[] }) {
    const [activeCategory, setActiveCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Extract unique categories from posts
    const categories = useMemo(() => {
        const cats = posts.map(post => post.frontmatter.category).filter(Boolean);
        return ['All', ...Array.from(new Set(cats))];
    }, [posts]);

    // Filter posts based on active category and search query
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesCategory = activeCategory === 'All' || post.frontmatter.category === activeCategory;
            const searchContent = `${post.frontmatter.title} ${post.frontmatter.description}`.toLowerCase();
            const matchesSearch = searchContent.includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [posts, activeCategory, searchQuery]);

    return (
        <div className="space-y-10">
            {/* Search and Filter Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${activeCategory === category
                                    ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]'}
              `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-[var(--text-secondary)]" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[var(--bg-secondary)] border-none rounded-full text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:ring-1 focus:ring-[var(--text-primary)] focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* Post Grid/List */}
            <div className="space-y-4 animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-widest">
                        {activeCategory === 'All' ? 'Latest Posts' : `${activeCategory} Posts`}
                    </h2>
                    <span className="text-xs text-[var(--text-secondary)]">
                        {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {filteredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}

                {filteredPosts.length === 0 && (
                    <div className="py-12 text-center border border-dashed border-[var(--border-color)] rounded-lg">
                        <p className="text-[var(--text-secondary)]">No posts found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
