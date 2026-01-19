"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import ThemeHook from "@/hooks/ThemeHook";

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation items as per PRD
    const navItems = [
        { name: "Home", href: "/" },
        // { name: 'Blog', href: '/' }, // Redundant while Blog is Home
        { name: "About", href: "#" },
        { name: "Contact", href: "#" },
    ];

    const { systemTheme } = ThemeHook();
    return (
        <nav className="w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)] sticky top-0 z-50 transition-colors duration-200">
            <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity text-[var(--text-primary)]"
                >
                    <Image
                    className="w-[20%]"
                        src={`/logo-${systemTheme}.svg`}
                        width={100}
                        height={100}
                        alt="logo"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-[var(--text-primary)]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-[var(--bg-primary)] border-b border-[var(--border-color)] animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col p-6 space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-lg font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
