import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, Star, Users, Award, MapPin, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'Joshua Mark',
      role: 'Founder & CEO',
      description: 'Passionate about luxury vehicles with years of experience in the automotive industry.',
    },
  ];

  const milestones = [
    { year: '2022', event: 'JOHAD WHEELS founded in Karatina, Kenya' },
    { year: '2022', event: 'First 50 luxury vehicles sold' },
    { year: '2023', event: 'Expanded to serve clients across Kenya' },
    { year: '2023', event: 'Reached 1000+ happy customers milestone' },
    { year: '2024', event: '5000+ satisfied clients served' },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-36 pb-20"
        style={{ background: 'linear-gradient(to bottom, #000, #0a0a0a)' }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5">
            About <span className="gold-text">JOHAD WHEELS</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Since 2022, we&apos;ve been Kenya&apos;s premier destination for luxury
            vehicles, serving discerning buyers with premium automobiles and
            exceptional service.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800"
                alt="JOHAD WHEELS Showroom"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div>
              <div className="text-yellow-500 text-sm font-semibold mb-3 uppercase tracking-wider">Our Story</div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Kenya&apos;s Premier{' '}
                <span className="gold-text">Luxury Car Dealer</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                 At JOHAD WHEELS, we are passionate about connecting aspiring car owners with quality vehicles that fit their lifestyle, needs, and budget. Founded in 2022, our mission has been simple — to make vehicle ownership accessible, reliable, and stress-free for customers across Kenya.
Based in Karatina, we specialize in sourcing, verifying, and selling a wide range of vehicles from trusted global manufacturers. Whether you are looking for a family car, SUV, pickup, executive vehicle, or everyday commuter, we are committed to helping you find the right match.
We proudly serve clients across Kenya through transparent pricing, flexible financing options, and exceptional customer service. Every vehicle in our inventory undergoes thorough inspection and verification to ensure quality, performance, and peace of mind for our customers.
At JOHAD WHEELS, we believe buying a car should be an exciting and confident experience, and we are dedicated to building lasting relationships through trust, professionalism, and reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: '#111111', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Award className="text-yellow-400" size={28} />, num: '500+', label: 'Premium Vehicles Sold' },
              { icon: <Users className="text-yellow-400" size={28} />, num: '5000+', label: 'Happy Customers' },
              { icon: <Star className="text-yellow-400" size={28} />, num: '98%', label: 'Success Rate' },
              { icon: <Shield className="text-yellow-400" size={28} />, num: '2+', label: 'Years Experience' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">{s.icon}</div>
                <div className="text-3xl font-black text-white mb-1">{s.num}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding" style={{ background: '#0a0a0a' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                // icon: '🎯',
                title: 'Our Mission',
                desc: 'To provide quality, verified vehicles at fair prices while delivering exceptional customer service, transparency, and a stress-free car-buying experience',
              },
              {
                // icon: '👁️',
                title: 'Our Vision',
                desc: "To be Kenya’s most trusted and reliable automotive partner, making quality vehicle ownership accessible to everyone.",
              },
              {
                // icon: '💎',
                title: 'Our Values',
                desc: 'Integrity, excellence, and customer-first approach in everything we do. Every client deserves the best experience.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-7 rounded-xl border border-gray-800 hover:border-yellow-500/40 transition-colors text-center"
                style={{ background: '#111111' }}
              >
                {/* <div className="text-5xl mb-5">{item.icon}</div> */}
                <h3 className="font-bold text-white text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" style={{ background: '#111111' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white mb-3">
              Our <span className="gold-text">Journey</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gray-800" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div
                      className="inline-block p-4 rounded-xl border border-gray-800"
                      style={{ background: '#0a0a0a' }}
                    >
                      <div className="text-yellow-400 font-black text-lg">{m.year}</div>
                      <div className="text-gray-300 text-sm mt-1">{m.event}</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500 border-4 border-black z-10 shrink-0" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: '#0a0a0a' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5">
            Ready to Find Your <span className="gold-text">Dream Car?</span>
          </h2>
          <p className="text-gray-400 mb-8">
            Browse our inventory or contact us today to start your luxury journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inventory" className="btn-gold px-8 py-3 rounded-lg font-bold">
              Browse Inventory
            </Link>
            <Link
              href="/contact"
              className="border border-gray-600 hover:border-yellow-500 text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}