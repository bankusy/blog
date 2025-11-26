"use client"

import { useEffect, useState } from 'react';
import { Heading } from '@/lib/toc';

export default function TableOfContents({ headings }: { headings: Heading[] }) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0% 0% -80% 0%' }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headings.forEach((heading) => { // Cleanup
                const element = document.getElementById(heading.id);
                if (element) observer.unobserve(element);
            });
        };
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="toc-nav sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto p-4 hidden lg:block">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-4">
                On this page
            </h4>
            <ul className="space-y-3 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: `${(heading.level - 1) * 0.5}rem` }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`
                block transition-colors duration-200
                ${activeId === heading.id
                                    ? 'text-[var(--text-primary)] font-medium translate-x-1'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}
              `}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                                setActiveId(heading.id); // Update active immediately on click
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
