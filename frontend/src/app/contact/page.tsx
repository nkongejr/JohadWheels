// app/contact/page.tsx
// NO 'use client' here
import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us | JOHAD WHEELS Karatina Kenya',
  description:
    "Get in touch with JOHAD WHEELS. Visit us in Karatina, Kenya or call 0797 250 555. We're here to help you find your dream car.",
  alternates: {
    canonical: 'https://johadwheels.co.ke/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}