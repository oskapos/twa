import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/providers/ClientProviders';
import Script from 'next/script';

const karla = Karla({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meme Cycle',
  description: 'Meme Cycle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <Script src='https://telegram.org/js/telegram-web-app.js' strategy='beforeInteractive' />
      </head>
      <body className={`${karla.className} relative antialiased dark bg-bg-dark min-h-screen  flex flex-col`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
