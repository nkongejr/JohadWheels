// app/inventory/page.tsx
// NO 'use client' here
import type { Metadata } from 'next';
import InventoryClient from '@/components/InventoryClient';

export const metadata: Metadata = {
  title: 'Car Inventory | Browse All Vehicles',
  description:
    'Browse our complete inventory of premium and luxury vehicles in Kenya. Filter by brand, price, year and more. New and used cars available.',
  alternates: {
    canonical: 'https://johadwheels.co.ke/inventory',
  },
};

export default function InventoryPage() {
  return <InventoryClient />;
}