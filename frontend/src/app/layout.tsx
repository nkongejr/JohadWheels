// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import StructuredData from '@/components/StructuredData';

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  // ── Basic ──────────────────────────────────────────────────
  title: {
    default: 'JOHAD WHEELS | Premium Cars in Kenya',
    template: '%s | JOHAD WHEELS',
  },
  description:
    'Kenya\'s premier car dealer. Browse premium BMW, Mercedes-Benz, Range Rover, Porsche & more. Located in Karatina, Kenya. Call 0797 250 555.',
  keywords: [
    'luxury cars Kenya',
    'premium cars Karatina',
    'buy car Kenya',
    'BMW Kenya',
    'Mercedes Kenya',
    'Range Rover Kenya',
    'Porsche Kenya',
    'used cars Kenya',
    'new cars Kenya',
    'car dealer Kenya',
    'JOHAD WHEELS',
    'cars for sale Kenya',
    'Nairobi car dealer',
    'Nyeri car dealer',
    'Toyota Kenya',
    'Prado Kenya',
    'Land Cruiser Kenya',
  ],
  authors: [{ name: 'JOHAD WHEELS', url: 'https://johadwheels.co.ke' }],
  creator: 'JOHAD WHEELS',
  publisher: 'JOHAD WHEELS',

  // ── Canonical URL ──────────────────────────────────────────
  metadataBase: new URL('https://johadwheels.co.ke'),
  alternates: {
    canonical: '/',
  },

  // ── Open Graph (Facebook, WhatsApp preview) ────────────────
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://johadwheels.co.ke',
    siteName: 'JOHAD WHEELS',
    title: 'JOHAD WHEELS | Premium Cars in Kenya',
    description:
      'Kenya\'s premier car dealer. Browse premium BMW, Mercedes-Benz, Range Rover, Porsche & more. Located in Karatina, Kenya.',
    images: [
      {
        url: '/logo.jpeg', // add this image to /public
        width: 1200,
        height: 630,
        alt: 'JOHAD WHEELS - Premium Cars Kenya',
      },
    ],
  },

  // ── Twitter Card ───────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'JOHAD WHEELS | Premium Cars in Kenya',
    description:
      'Kenya\'s premier car dealer. Browse premium BMW, Mercedes-Benz, Range Rover, Porsche & more. Located in Karatina, Kenya.',
    images: ['/logo.jpeg'], // add this image to /public
    creator: '@johadwheels',
  },

  // ── Icons ─────────────────────────────────────────────────
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // ── Robots ────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Verification ────────────────────────────────────────
  verification: {
    google: 'QwS_nN4kIZ0MlicEJSlc9XQl-mejBoxhQESeVQsG3y4', // ← ADD THIS
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <head>
        <StructuredData />
      </head>
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111111',
              color: '#ffffff',
              border: '1px solid #d4a017',
            },
            success: {
              iconTheme: { primary: '#d4a017', secondary: '#000' },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}