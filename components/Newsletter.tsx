"use client";

import { useState } from 'react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setStatus('loading');

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus('success');
        setEmail('');
    };

    return (
        <section className="w-full py-16 bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
            <div className="max-w-2xl mx-auto px-6 text-center">
                <div className="inline-flex items-center justify-center p-3 mb-6 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] shadow-sm">
                    <Mail className="w-6 h-6 text-[var(--primary-color)]" />
                </div>

                <h2 className="text-3xl font-bold tracking-tight mb-4 text-[var(--text-primary)]">
                    Subscribe to our Newsletter
                </h2>
                <p className="text-[var(--text-secondary)] mb-8 text-lg leading-relaxed">
                    Stay ahead with the latest fintech trends and development stories.<br className="hidden sm:block" />
                    No spam, unsubscribe at any time.
                </p>

                {status === 'success' ? (
                    <div className="bg-[var(--bg-primary)] border border-[var(--primary-color)] rounded-xl p-6 animate-in fade-in zoom-in duration-300">
                        <div className="flex flex-col items-center gap-3">
                            <CheckCircle2 className="w-10 h-10 text-[var(--primary-color)]" />
                            <h3 className="text-lg font-bold text-[var(--text-primary)]">Subscription Successful!</h3>
                            <p className="text-[var(--text-secondary)]">
                                Our newsletter service is coming soon.<br />
                                You'll be the first to know when we launch!
                            </p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                disabled={status === 'loading'}
                                className="flex-1 px-5 py-3.5 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="px-6 py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center min-w-[120px]"
                            >
                                {status === 'loading' ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    'Subscribe'
                                )}
                            </button>
                        </div>
                        <p className="mt-4 text-xs text-[var(--text-secondary)]">
                            By subscribing, you agree to our Privacy Policy.
                        </p>
                    </form>
                )}
            </div>
        </section>
    );
}
