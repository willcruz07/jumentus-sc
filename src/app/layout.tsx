import type { Metadata, Viewport } from 'next';
import { Inter, Roboto, Exo_2 } from 'next/font/google';

import './globals.css';

import PrelineScript from '@/components/PrelineScript';

import { AuthSession } from '@/providers/AuthSession';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Jumentus - SC';
const APP_DEFAULT_TITLE = 'JUMENTUS SC - SCORES';
const APP_TITLE_TEMPLATE = '%s - Jumentus Sc';
const APP_DESCRIPTION = 'Scores Jumentus sc';

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
  // title: 'Jumentus SC',
  icons: [{ rel: 'icon', sizes: 'any', url: './img/favicon.ico' }],
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#121212',
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
