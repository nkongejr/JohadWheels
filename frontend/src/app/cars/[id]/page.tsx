// app/cars/[id]/page.tsx
// NO 'use client' here
import type { Metadata } from 'next';
import CarDetailClient from '@/components/CarDetailClient';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cars/${params.id}`,
      { next: { revalidate: 3600 } },
    );
    const car = await res.json();

    return {
      title: `${car.brand} ${car.model} ${car.year} for Sale in Kenya`,
      description: `${car.brand} ${car.model} ${car.year} - ${car.condition} - KES ${car.price?.toLocaleString()}. ${car.description?.slice(0, 120)}. Located in ${car.location || 'Kenya'}.`,
      keywords: [
        `${car.brand} Kenya`,
        `${car.model} for sale`,
        `${car.brand} ${car.model} price Kenya`,
        `buy ${car.brand} Kenya`,
        `${car.type} Kenya`,
      ],
      openGraph: {
        title: `${car.brand} ${car.model} ${car.year} | JOHAD WHEELS`,
        description: `${car.condition} ${car.brand} ${car.model} ${car.year} for KES ${car.price?.toLocaleString()}`,
        images: car.images?.[0]
          ? [{ url: car.images[0], width: 800, height: 600, alt: `${car.brand} ${car.model}` }]
          : [],
        url: `https://johadwheels.co.ke/cars/${params.id}`,
      },
      alternates: {
        canonical: `https://johadwheels.co.ke/cars/${params.id}`,
      },
    };
  } catch {
    return {
      title: 'Car for Sale | JOHAD WHEELS',
      description: 'Premium car for sale at JOHAD WHEELS Kenya.',
    };
  }
}

export default function CarPage({ params }: { params: { id: string } }) {
  return <CarDetailClient id={params.id} />;
}