// components/StructuredData.tsx
export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'JOHAD WHEELS',
    description:
      "Kenya's premier luxury car dealer based in Karatina",
    url: 'https://johadwheels.co.ke',
    logo: 'https://johadwheels.co.ke/logo.jpeg',
    image: 'https://johadwheels.co.ke/og-image.jpg',
    telephone: '+254797250555',
    email: 'info@johadwheels.co.ke',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Karatina Town',
      addressLocality: 'Karatina',
      addressRegion: 'Nyeri County',
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -0.485155,
      longitude: 37.123851,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday','Tuesday','Wednesday',
          'Thursday','Friday','Saturday',
        ],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '10:00',
        closes: '16:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/profile.php?id=61590238221238',
      'https://www.tiktok.com/@johadwheels',
    ],
    priceRange: 'KES 500,000 - KES 65,000,000',
    currenciesAccepted: 'KES',
    paymentAccepted: 'Cash, M-Pesa, Bank Transfer',
    areaServed: 'Kenya',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}