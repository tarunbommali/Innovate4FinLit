import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { RegisterServiceWorker } from './register-sw';
import { NetworkStatus } from '@/components/NetworkStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Financial Literacy Platform for Bharat',
  description: 'Offline-first gamified financial literacy platform',
  manifest: '/manifest.json',
  themeColor: '#4F46E5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RegisterServiceWorker />
        <AuthProvider>
          {children}
          <NetworkStatus />
        </AuthProvider>
      </body>
    </html>
  );
}
