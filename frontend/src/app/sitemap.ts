// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://johadwheels.co.ke';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/inventory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic car pages
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cars?limit=100`,
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    const cars = data.cars || [];

    const carPages: MetadataRoute.Sitemap = cars.map((car: any) => ({
      url: `${baseUrl}/cars/${car._id}`,
      lastModified: new Date(car.updatedAt || car.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...carPages];
  } catch {
    return staticPages;
  }
}