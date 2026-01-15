'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from 'react-redux';
import makeStore from '@/src/lib/store';
import { AppMenuBar } from '@/src/user-management/app-menu-bar/AppMenuBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = makeStore();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <AppMenuBar />
          <main className="p-6">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
