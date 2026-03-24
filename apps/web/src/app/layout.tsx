import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBA Lite — Your MBA, 15 Minutes a Day',
  description:
    'AI-powered micro-learning MBA tutor with daily bite-sized lessons, real-world case studies, and an adaptive AI tutor. With a specialized track in AI management.',
  keywords: ['MBA', 'business education', 'micro-learning', 'AI tutor', 'case studies'],
  openGraph: {
    title: 'MBA Lite',
    description: 'Your MBA, 15 Minutes a Day.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text-primary antialiased">{children}</body>
    </html>
  );
}
