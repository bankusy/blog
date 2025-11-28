
import { getAllPosts } from '@/lib/posts';
import PostList from '@/components/PostList';
import Navigation from '@/components/Navigation';

import Newsletter from '@/components/Newsletter';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navigation />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-20 pt-10 border-b border-[var(--border-color)] pb-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-[var(--text-primary)]">
            Writing.
          </h1>
          <p className="text-xl text-[var(--text-secondary)] font-light max-w-lg">
            Thoughts on development, design, and the future of technology._
          </p>
        </header>

        <section>
          <PostList posts={posts} />
        </section>
      </main>

      <Newsletter />

      <footer className="border-t border-[var(--border-color)] mt-0 py-12 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          &copy; {new Date().getFullYear()} Bankusy. Built with Next.js & Tailwind.
        </p>
      </footer>
    </div>
  );
}
