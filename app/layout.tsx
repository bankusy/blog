import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Bankusy | Hacker News & Tech Insights",
  description: "Curated tech news and analysis from Hacker News and other sources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SEO Meta Tags */}
        <meta name="description" content="Latest tech news, analysis, and curated articles from Hacker News and other sources." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://bankusy.com/" />
        {/* Open Graph */}
        <meta property="og:title" content="Bankusy – Hacker News & Tech Insights" />
        <meta property="og:description" content="Latest tech news, analysis, and curated articles from Hacker News and other sources." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bankusy.com/" />
        <meta property="og:image" content="https://bankusy.com/og-image.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bankusy – Hacker News & Tech Insights" />
        <meta name="twitter:description" content="Latest tech news, analysis, and curated articles from Hacker News and other sources." />
        <meta name="twitter:image" content="https://bankusy.com/og-image.png" />
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-6526196629273808" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html >
  );
}
