// app/page.tsx
import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title: 'Premium Cars for Sale in Kenya | JOHAD WHEELS',
  description:
    "Browse Kenya's finest luxury vehicles. BMW, Mercedes-Benz, Range Rover, Porsche & more. Fair prices, verified vehicles. Based in Karatina, Kenya.",
  alternates: {
    canonical: 'https://johadwheels.co.ke',
  },
};

export default function Page() {
  return <HomePageClient />;
}