import type { Metadata } from 'next';
import { Inter, Roboto, Exo_2 } from 'next/font/google';

import './globals.css';

import PrelineScript from '@/components/PrelineScript';

import { AuthSession } from '@/providers/AuthSession';

const inter = Inter({ subsets: ['latin'] });

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
});

const exo = Exo_2({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-exo',
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Jumentus SC',
  icons: [{ rel: 'icon', sizes: 'any', url: './img/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthSession>
        <body
          className={`${inter.className} ${exo.className} ${roboto.className}`}
        >
          {children}
        </body>
        <PrelineScript />
      </AuthSession>
    </html>
  );
}
