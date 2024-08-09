import type { Viewport } from 'next';
import { Inter, Roboto, Exo_2 } from 'next/font/google';

import './globals.css';

import PrelineScript from '@/components/PrelineScript';

import { cn } from '@/lib/utils';

import { AuthSession } from '@/providers/AuthSession';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});

const exo = Exo_2({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const viewport: Viewport = {
  themeColor: '#121212',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthSession>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable,
            roboto.variable,
            exo.variable
          )}
        >
          {children}
        </body>
        <PrelineScript />
      </AuthSession>
    </html>
  );
}
