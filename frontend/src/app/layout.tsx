import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'JOHAD WHEELS - Premium Luxury Vehicles',
  description:
    "Kenya's premier destination for luxury vehicles. BMW, Mercedes-Benz, Audi, Porsche, Range Rover and more.",
  keywords: 'luxury cars Kenya, BMW Kenya, Mercedes Kenya, Porsche Kenya',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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